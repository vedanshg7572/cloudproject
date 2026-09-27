import { Router } from 'express';
import { EC2Client, DescribeInstancesCommand, DescribeVolumesCommand } from '@aws-sdk/client-ec2';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
import { demoResources, demoRecommendations } from '../demoData';

const router = Router();
const isDemo = () => process.env.DEMO_MODE === 'true' || !process.env.AWS_ACCESS_KEY_ID;
const region = () => process.env.AWS_REGION || 'us-east-1';

// GET /api/resources/list
router.get('/list', async (_req, res) => {
  if (isDemo()) {
    return res.json({ data: demoResources, isDemo: true });
  }
  try {
    const ec2 = new EC2Client({ region: region() });
    const s3  = new S3Client({ region: region() });
    const resources: any[] = [];

    // EC2 Instances
    const instancesResp = await ec2.send(new DescribeInstancesCommand({}));
    for (const reservation of instancesResp.Reservations || []) {
      for (const instance of reservation.Instances || []) {
        const name = instance.Tags?.find(t => t.Key === 'Name')?.Value || instance.InstanceId;
        resources.push({
          id: instance.InstanceId,
          name,
          service: 'EC2',
          region: region(),
          status: instance.State?.Name || 'unknown',
          utilization: null, // would need CloudWatch
          monthlyCost: null, // would need Cost Explorer
          optimizationStatus: 'Review',
        });
      }
    }

    // EBS Volumes
    const volumesResp = await ec2.send(new DescribeVolumesCommand({}));
    for (const vol of volumesResp.Volumes || []) {
      const name = vol.Tags?.find(t => t.Key === 'Name')?.Value || vol.VolumeId;
      resources.push({
        id: vol.VolumeId,
        name,
        service: 'EBS',
        region: region(),
        status: vol.State || 'unknown',
        utilization: vol.Attachments?.length ? 50 : 0,
        monthlyCost: (vol.Size || 0) * 0.1, // gp2 estimate
        optimizationStatus: vol.Attachments?.length === 0 ? 'Action Needed' : 'Good',
      });
    }

    // S3 Buckets
    const bucketsResp = await s3.send(new ListBucketsCommand({}));
    for (const bucket of bucketsResp.Buckets || []) {
      resources.push({
        id: bucket.Name,
        name: bucket.Name,
        service: 'S3',
        region: region(),
        status: 'Active',
        utilization: null,
        monthlyCost: null,
        optimizationStatus: 'Review',
      });
    }

    res.json({ data: resources, isDemo: false });
  } catch (err) {
    console.error('Resources error:', err);
    res.json({ data: demoResources, isDemo: true, fallback: true });
  }
});

// GET /api/resources/recommendations
router.get('/recommendations', (_req, res) => {
  // Always return demo recommendations for now
  // Real implementation would analyze CloudWatch metrics + Cost Explorer
  res.json({ data: demoRecommendations, isDemo: isDemo() });
});

export { router as resourceRoutes };

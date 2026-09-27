// ── Demo data matching frontend ──────────────────────────────────────────────
export const demoCostTrend = [
  { month: 'Apr', cost: 142.10 },
  { month: 'May', cost: 156.40 },
  { month: 'Jun', cost: 149.80 },
  { month: 'Jul', cost: 171.20 },
  { month: 'Aug', cost: 168.90 },
  { month: 'Sep', cost: 184.72 },
];

export const demoCostByService = [
  { service: 'EC2',        cost: 91.20 },
  { service: 'S3',         cost: 31.80 },
  { service: 'RDS',        cost: 28.40 },
  { service: 'Lambda',     cost: 11.30 },
  { service: 'CloudWatch', cost:  8.20 },
  { service: 'Other',      cost: 13.82 },
];

export const demoSummary = {
  monthlySpend:       184.72,
  potentialSavings:    47.30,
  optimizationScore:   81,
  resourcesAnalyzed:   27,
  isDemo:             true,
};

export const demoRecommendations = [
  {
    id: 'rec-001',
    priority: 'HIGH',
    service: 'EBS',
    title: 'Unused EBS Volume Detected',
    description: 'An unattached EBS volume (vol-0a1b2c3d4e) has been unused for 47 days.',
    estimatedSaving: 12.40,
    action: 'Review and delete if no longer required. Snapshot first if data may be needed.',
    risk: 'Low — volume is unattached and not serving active workloads.',
    resourceId: 'vol-0a1b2c3d4e',
    region: 'us-east-1',
  },
  {
    id: 'rec-002',
    priority: 'MEDIUM',
    service: 'EC2',
    title: 'Oversized EC2 Instance',
    description: 'Instance i-0ec2webserver01 (m5.large) shows average CPU utilization of only 8.2%.',
    estimatedSaving: 18.70,
    action: 'Consider downsizing to t3.medium after validating workload requirements.',
    risk: 'Medium — validate during low-traffic window before changing.',
    resourceId: 'i-0ec2webserver01',
    region: 'us-east-1',
  },
  {
    id: 'rec-003',
    priority: 'LOW',
    service: 'S3',
    title: 'S3 Lifecycle Policy Opportunity',
    description: 'Bucket s3-assets-prod contains ~82 GB of objects older than 90 days not in a lower-cost tier.',
    estimatedSaving: 16.20,
    action: 'Add a lifecycle rule to transition objects older than 90 days to S3 Standard-IA.',
    risk: 'Low — lifecycle rules are non-destructive and reversible.',
    resourceId: 's3-assets-prod',
    region: 'us-east-1',
  },
];

export const demoResources = [
  { id: 'i-0ec2webserver01', name: 'EC2-Web-01',    service: 'EC2',    region: 'us-east-1', status: 'Running',    utilization: 22, monthlyCost: 42.80, optimizationStatus: 'Review' },
  { id: 'i-0ec2apiserver02', name: 'EC2-API-02',    service: 'EC2',    region: 'us-east-1', status: 'Running',    utilization: 61, monthlyCost: 38.40, optimizationStatus: 'Good' },
  { id: 's3-assets-prod',    name: 'S3-Assets',     service: 'S3',     region: 'us-east-1', status: 'Active',     utilization: 61, monthlyCost: 12.30, optimizationStatus: 'Review' },
  { id: 'vol-0a1b2c3d4e',   name: 'EBS-Old-01',    service: 'EBS',    region: 'us-east-1', status: 'Unattached', utilization:  0, monthlyCost:  8.90, optimizationStatus: 'Action Needed' },
  { id: 'rds-prod-mysql',    name: 'RDS-Prod-MySQL', service: 'RDS',   region: 'us-east-1', status: 'Available',  utilization: 33, monthlyCost: 28.40, optimizationStatus: 'Review' },
  { id: 'fn-image-resize',   name: 'Lambda-Resize', service: 'Lambda', region: 'us-east-1', status: 'Active',     utilization: 14, monthlyCost:  3.10, optimizationStatus: 'Good' },
];

// Demo/sandbox data for CloudGuard AI
// All values are clearly labeled as simulated data

export const DEMO_MODE = true; // set false when real AWS is connected

export const demoSummary = {
  monthlySpend: 184.72,
  potentialSavings: 47.30,
  optimizationScore: 81,
  resourcesAnalyzed: 27,
  lastUpdated: new Date().toISOString(),
};

export const demoCostTrend = [
  { month: 'Apr', cost: 142.10 },
  { month: 'May', cost: 156.40 },
  { month: 'Jun', cost: 149.80 },
  { month: 'Jul', cost: 171.20 },
  { month: 'Aug', cost: 168.90 },
  { month: 'Sep', cost: 184.72 },
];

export const demoDailyCost = Array.from({ length: 30 }, (_, i) => ({
  day: `Sep ${i + 1}`,
  cost: +(4.5 + Math.sin(i * 0.4) * 1.8 + Math.random() * 1.2).toFixed(2),
}));

export const demoCostByService = [
  { service: 'EC2',        cost: 91.20, color: '#3b82f6' },
  { service: 'S3',         cost: 31.80, color: '#06b6d4' },
  { service: 'RDS',        cost: 28.40, color: '#8b5cf6' },
  { service: 'Lambda',     cost: 11.30, color: '#10b981' },
  { service: 'CloudWatch', cost:  8.20, color: '#f59e0b' },
  { service: 'Other',      cost: 13.82, color: '#6b7280' },
];

export const demoOptimizationScore = {
  overall: 81,
  breakdown: [
    { label: 'Cost Efficiency',      score: 74, color: '#3b82f6' },
    { label: 'Resource Utilization', score: 86, color: '#10b981' },
    { label: 'Unused Resources',     score: 79, color: '#f59e0b' },
    { label: 'Storage Optimization', score: 82, color: '#8b5cf6' },
    { label: 'Operational Hygiene',  score: 84, color: '#06b6d4' },
  ],
};

export const demoRecommendations = [
  {
    id: 'rec-001',
    priority: 'HIGH',
    service: 'EBS',
    title: 'Unused EBS Volume Detected',
    description: 'An unattached EBS volume (vol-0a1b2c3d4e) has been unused for 47 days and may be generating unnecessary storage cost.',
    estimatedSaving: 12.40,
    action: 'Review and delete if no longer required. Snapshot first if data may be needed.',
    risk: 'Low — volume is unattached and not serving active workloads.',
    resourceId: 'vol-0a1b2c3d4e',
    region: 'us-east-1',
    enabled: true,
  },
  {
    id: 'rec-002',
    priority: 'MEDIUM',
    service: 'EC2',
    title: 'Oversized EC2 Instance',
    description: 'Instance i-0ec2webserver01 (m5.large) shows average CPU utilization of only 8.2% over the past 30 days.',
    estimatedSaving: 18.70,
    action: 'Consider downsizing to t3.medium after validating workload requirements under peak conditions.',
    risk: 'Medium — validate during low-traffic window before changing.',
    resourceId: 'i-0ec2webserver01',
    region: 'us-east-1',
    enabled: true,
  },
  {
    id: 'rec-003',
    priority: 'LOW',
    service: 'S3',
    title: 'S3 Lifecycle Policy Opportunity',
    description: 'Bucket s3-assets-prod contains objects older than 90 days (estimated 82 GB) not transitioned to a lower-cost storage class.',
    estimatedSaving: 16.20,
    action: 'Add a lifecycle rule to transition objects older than 90 days to S3 Standard-IA or S3 Glacier.',
    risk: 'Low — lifecycle rules are non-destructive and reversible.',
    resourceId: 's3-assets-prod',
    region: 'us-east-1',
    enabled: true,
  },
];

export const demoResources = [
  { id: 'i-0ec2webserver01', name: 'EC2-Web-01',     service: 'EC2',     region: 'us-east-1', status: 'Running',     utilization: 22,  monthlyCost: 42.80, optimizationStatus: 'Review' },
  { id: 'i-0ec2apiserver02', name: 'EC2-API-02',     service: 'EC2',     region: 'us-east-1', status: 'Running',     utilization: 61,  monthlyCost: 38.40, optimizationStatus: 'Good' },
  { id: 'i-0ec2worker03',    name: 'EC2-Worker-03',  service: 'EC2',     region: 'us-west-2', status: 'Running',     utilization: 44,  monthlyCost: 10.00, optimizationStatus: 'Good' },
  { id: 's3-assets-prod',    name: 'S3-Assets',      service: 'S3',      region: 'us-east-1', status: 'Active',      utilization: 61,  monthlyCost: 12.30, optimizationStatus: 'Review' },
  { id: 's3-logs-bucket',    name: 'S3-Logs',        service: 'S3',      region: 'us-east-1', status: 'Active',      utilization: 38,  monthlyCost:  8.20, optimizationStatus: 'Good' },
  { id: 'vol-0a1b2c3d4e',   name: 'EBS-Old-01',     service: 'EBS',     region: 'us-east-1', status: 'Unattached',  utilization:  0,  monthlyCost:  8.90, optimizationStatus: 'Action Needed' },
  { id: 'vol-0f5e6d7c8b',   name: 'EBS-App-02',     service: 'EBS',     region: 'us-east-1', status: 'Attached',    utilization: 52,  monthlyCost:  4.60, optimizationStatus: 'Good' },
  { id: 'rds-prod-mysql',    name: 'RDS-Prod-MySQL',  service: 'RDS',     region: 'us-east-1', status: 'Available',   utilization: 33,  monthlyCost: 28.40, optimizationStatus: 'Review' },
  { id: 'fn-image-resize',   name: 'Lambda-Resize',  service: 'Lambda',  region: 'us-east-1', status: 'Active',      utilization: 14,  monthlyCost:  3.10, optimizationStatus: 'Good' },
  { id: 'fn-api-handler',    name: 'Lambda-API',     service: 'Lambda',  region: 'us-east-1', status: 'Active',      utilization: 29,  monthlyCost:  5.80, optimizationStatus: 'Good' },
  { id: 'fn-scheduled-job',  name: 'Lambda-Cron',    service: 'Lambda',  region: 'us-east-1', status: 'Active',      utilization:  6,  monthlyCost:  2.40, optimizationStatus: 'Review' },
  { id: 'cw-alarms-stack',   name: 'CW-Alarms',      service: 'CloudWatch', region: 'us-east-1', status: 'Active',  utilization: 100, monthlyCost:  8.20, optimizationStatus: 'Good' },
];

export const demoRecentActivity = [
  { id: 1, type: 'scan',   message: 'Full infrastructure scan completed — 27 resources analyzed', time: '2 min ago',  icon: 'scan' },
  { id: 2, type: 'alert',  message: 'High priority: Unused EBS volume vol-0a1b2c3d4e detected',  time: '5 min ago',  icon: 'alert' },
  { id: 3, type: 'tip',    message: 'New optimization available: EC2-Web-01 right-sizing opportunity', time: '18 min ago', icon: 'tip' },
  { id: 4, type: 'info',   message: 'Monthly cost trend: +9.4% vs last month',                   time: '1 hr ago',   icon: 'info' },
  { id: 5, type: 'scan',   message: 'Cost Explorer data refreshed for September 2026',           time: '3 hr ago',   icon: 'scan' },
];

export const demoSimulatorOptions = [
  { id: 'resize-ec2', label: 'Resize underutilized EC2 instances', saving: 18.70, enabled: true },
  { id: 'remove-ebs', label: 'Remove unattached EBS volumes',      saving: 12.40, enabled: true },
  { id: 's3-lifecycle', label: 'Optimize S3 lifecycle policies',   saving: 16.20, enabled: true },
];

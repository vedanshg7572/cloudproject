# 🏆 CloudGuard AI — Hackathon Submission

## Basic Info

| Field | Value |
|-------|-------|
| **Project Name** | CloudGuard AI |
| **Category** | #workplace-efficiency |
| **Lane** | #startups |
| **GitHub** | https://github.com/vedanshg7572/cloudproject |
| **Live URL** | *(update after AWS deployment)* |

---

## One-Line Description

An AI-powered AWS cloud optimization copilot that turns infrastructure data into actionable cost-saving insights for developers and small engineering teams.

---

## The Problem

Developers ship fast on AWS. But billing visibility rarely keeps up — unused resources accumulate, oversized instances run unnoticed, and cost spikes go unexplained. Small teams lack the FinOps expertise or tooling to continuously monitor and optimize their cloud spend.

---

## The Solution

CloudGuard AI is a full-stack SaaS application that:

1. Connects to AWS via read-only IAM credentials
2. Analyzes Cost Explorer, EC2, S3, EBS, CloudWatch data
3. Uses Amazon Bedrock (Claude) to generate AI-powered recommendations
4. Presents a polished dashboard with actionable insights
5. Lets teams simulate savings before making any changes

---

## What Makes It Innovative

- **AI Copilot with context** — Bedrock receives summarized infrastructure context, not raw data, for smarter responses
- **What-If Simulator** — Model savings scenarios interactively before committing to changes
- **Graceful degradation** — Works perfectly as a demo without any AWS account
- **Read-only by design** — Cannot modify or delete any AWS resources
- **Serverless architecture** — Lambda + API Gateway + S3 + CloudFront — fully AWS-native

---

## AWS Services Used

- Amazon S3 (frontend hosting)
- Amazon CloudFront (CDN)
- Amazon API Gateway (REST API)
- AWS Lambda (backend handlers)
- AWS Cost Explorer (cost data)
- Amazon EC2 API (resource inventory)
- Amazon CloudWatch (utilization metrics)
- Amazon Bedrock (AI — Claude claude-3-haiku)
- Amazon DynamoDB (settings, optional)

---

## How the Coding Agent Helped

An AI coding agent (Antigravity / Google DeepMind) was used throughout development:

- Scaffolded the full React + TypeScript + Tailwind frontend
- Built the Node.js + Express backend with AWS SDK v3 integration
- Wrote all AWS SDK calls (Cost Explorer, EC2, S3, Bedrock)
- Fixed TypeScript compilation errors in real-time
- Created the demo data system with realistic seeded values
- Wrote README, deployment docs, and hackathon submission materials
- Set up Git and connected to the GitHub repository

All code was reviewed and tested. The agent was connected to the local development environment and the GitHub repository.

---

## Development Process

1. **Phase 1** — Frontend scaffold (React + Vite + Tailwind + TypeScript)
2. **Phase 2** — Demo data system + all 9 pages
3. **Phase 3** — Backend (Express + AWS SDK v3 routes)
4. **Phase 4** — Bedrock AI integration with graceful fallback
5. **Phase 5** — TypeScript error fixes + build verification
6. **Phase 6** — GitHub push + documentation
7. **Phase 7** — AWS deployment (S3 + CloudFront + Lambda)
8. **Phase 8** — Final polish + hackathon docs

---

## AI Functionality

- **Amazon Bedrock** powers the AI Copilot chat interface
- The backend sends summarized infrastructure context (spend, top services, recommendations) to Claude
- Claude responds with explanations, priorities, and recommended actions
- If Bedrock is unavailable, built-in keyword-matched responses provide a seamless fallback
- No AWS credentials or raw data ever reach the browser

---

## Impact

- Helps developers understand their AWS bill in plain English
- Identifies optimization opportunities that often go unnoticed
- Estimates potential savings without requiring FinOps expertise
- Fully functional demo for teams evaluating before connecting real credentials

---

## Future Roadmap

- Multi-account AWS Organizations support
- Slack/Teams cost anomaly alerts
- Automated savings tracking over time
- Terraform/CDK export of recommendations
- Scheduled weekly optimization digest emails
- Cost allocation by team tag

---

> ⚠️ All savings figures shown in the application are estimates based on simulated or real data. They are not guaranteed outcomes. CloudGuard AI is not affiliated with Amazon Web Services, Inc.

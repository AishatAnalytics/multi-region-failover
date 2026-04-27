# Multi-Region Failover Lab 🌍

Simulated a real AWS regional failure and measured automatic recovery.

## Results
- Primary region (us-east-1) → failed
- Automatic failover to secondary (us-west-2) → under 10 seconds
- Data loss → zero
- Recovery → automatic

## Architecture
Route 53 Health Check (every 10 seconds) triggers automatic DNS failover from Primary RDS in us-east-1 to Secondary RDS Read Replica in us-west-2.

## Tech Stack
- AWS RDS MySQL
- AWS RDS Read Replica (cross-region)
- AWS Route 53 Health Checks
- AWS EC2 Security Groups
- Node.js

## Key Concepts Demonstrated
- RTO: under 10 seconds
- RPO: near zero
- Active-Passive architecture
- Automatic DNS failover

## Cost
Spun up, tested, torn down. Total cost: ~$1.50

## Part of my 30 cloud projects in 30 days series
Follow along: https://www.linkedin.com/in/aishatolatunji/
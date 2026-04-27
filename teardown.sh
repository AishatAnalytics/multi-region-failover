#!/bin/bash
echo "🗑️ Starting teardown..."

echo "Deleting secondary RDS replica..."
aws rds delete-db-instance \
  --db-instance-identifier morning-bot-secondary \
  --skip-final-snapshot \
  --region us-west-2

echo "Deleting primary RDS instance..."
aws rds delete-db-instance \
  --db-instance-identifier morning-bot-primary \
  --skip-final-snapshot \
  --region us-east-1

echo "Deleting Route 53 health check..."
aws route53 delete-health-check \
  --health-check-id 5538bcbd-7e5c-4b69-9988-fcb56a86aa0f

echo "✅ Teardown complete! No more charges."
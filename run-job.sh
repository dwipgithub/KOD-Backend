#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' /Users/dp/Documents/Project/Kos/Backend/.env | xargs)

# Change to the Backend directory
cd /Users/dp/Documents/Project/Kos/Backend

# Run the Node.js job script
/opt/homebrew/bin/node jobs/runFinancialReportJob.js
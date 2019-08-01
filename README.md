# URL Validator

**Goal of this project:** Provide a easy way to check multiple urls or search terms and their corresponding result count.
(Like validating all GCS startUrls and see which does not return any results. This information is useful to identify wrong configured urls.) 

## Usage

1. enter search application
1. enter datasource
1. enter serach endpoint
1. enter search terms or urls (batch)
1. click validate

## Deployment (Cloud Run)

```bash
gcloud config set project <project>
gcloud builds submit --tag gcr.io/bayer-internet-gcs-staging/gcs-debug-interface
gcloud beta run deploy --image gcr.io/bayer-internet-gcs-staging/gcs-debug-interface --region europe-west1 --memory=512M
```
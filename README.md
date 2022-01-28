# Deletes an image version(tag) in Aliyun container registry

## usage

### personal version

```yaml
- uses: hello-liang-shan/acr-delete-tag@v1
  with:
    access-key-id: '<access key id>'
    access-key-secret: '<access key secret>'
    region-id: '<region id>' # default: cn-hangzhou 
    repo-namespace: '<repo-namespace>'
    repo-name: '<repo-name>'
    tag: '<image-tag>'
```

### enterprise version

```yaml
- uses: hello-liang-shan/acr-delete-tag@v1
  with:
    access-key-id: '<access key id>'
    access-key-secret: '<access key secret>'
    region-id: '<region id>' # default: cn-hangzhou 
    instance-id: '<instance-id>'
    repo-id: '<repo-id>'
    tag: '<image-tag>'
```

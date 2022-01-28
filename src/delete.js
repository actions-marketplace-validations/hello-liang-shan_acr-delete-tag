const core = require('@actions/core')
const ROAClient = require('@alicloud/pop-core').ROAClient
const RPCClient = require('@alicloud/pop-core').RPCClient

async function run() {
    let accessKeyId = core.getInput('access-key-id', {required: true})
    let accessKeySecret = core.getInput('access-key-secret', {required: true})
    let regionId = core.getInput('region-id', {required: false})
    let instanceId = core.getInput('instance-id', {required: false})
    let repoId = core.getInput('repo-id', {required: false})
    let repoNamespace = core.getInput('repo-namespace', {required: false})
    let repoName = core.getInput('repo-name', {required: false})
    let tag = core.getInput('tag', {required: false})
    let endpoint = `https://cr.${regionId}.aliyuncs.com`

    try {

        if (instanceId.length === 0) {
            console.log('Using personal API')

            const client = new ROAClient({
                accessKeyId: accessKeyId,
                accessKeySecret: accessKeySecret,
                endpoint: endpoint,
                apiVersion: '2016-06-07'
            })

            const headers = {
                'Content-Type': 'application/json'
            }

            client.request('DELETE', `/repos/${repoNamespace}/${repoName}/tags/${tag}`, {}, '', headers, {}).then(() => {
                console.log('Image tag deleted')
            }, (err) => {
                if (err.statusCode !== 404) {
                    core.setFailed(err)
                }
            })
        } else {
            console.log('Using enterprise API')

            const client = new RPCClient({
                accessKeyId: accessKeyId,
                accessKeySecret: accessKeySecret,
                endpoint: endpoint,
                apiVersion: '2018-12-01'
            })

            const params = {
                'RegionId': regionId,
                'InstanceId': instanceId,
                'RepoId': repoId,
                'Tag': tag
            }

            const requestOption = {
                method: 'POST'
            }

            client.request('DeleteRepoTag', params, requestOption).then(() => {
                console.log('Image tag deleted')
            }, (err) => {
                if (err.statusCode !== 404) {
                    core.setFailed(err)
                }
            })
        }

    } catch (err) {
        core.setFailed(`Failed to delete image tag, err: ${err}`)
    }
}

run().catch(e => core.setFailed(e))

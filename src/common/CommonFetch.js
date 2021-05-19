import { message } from 'antd'

class CommonFetch {
  post(url, body) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((ret) => ret.json())
        .then((ret) => {
          if (ret.code !== 0) {
            message.error(ret.message || ret.error || '失败')
          } else {
            resolve(ret)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default new CommonFetch()

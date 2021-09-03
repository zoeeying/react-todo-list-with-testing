const mockUndoList = {
  data: [
    {
      status: 'blur',
      value: 'ying zhou',
    },
  ],
  success: true,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get(url) {
    if (url === '/undoList.json') {
      return new Promise((resolve, reject) => {
        if (this.success) {
          resolve(mockUndoList)
        } else {
          reject(new Error())
        }
      })
    }
  },
}

class DraftsStorage {
  static readDrafts () {
    const json = localStorage.getItem('draftsInTweetDeck') || '[]'
    return JSON.parse(json)
  }

  static updateDrafts (drafts) {
    const json = JSON.stringify(drafts)
    localStorage.setItem('draftsInTweetDeck', json)
  }

  static cleanDrafts () {
    localStorage.removeItem('draftsInTweetDeck')
  }

  static addDraft (text) {
    const drafts = this.readDrafts()
    drafts.unshift(text)
    this.updateDrafts(drafts)
  }

  static removeDraft (i) {
    const drafts = this.readDrafts()
    drafts.splice(i, 1)
    this.updateDrafts(drafts)
  }
}

export default DraftsStorage

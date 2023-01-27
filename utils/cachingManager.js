const NodeCache = require("node-cache");
// const { Cache } = require('../utils/cachingManager');
const { DB_COLLECTIONS } = require('../config/constant');
const fetch = require("node-fetch");

class Cache {

  constructor() {
    this.cache = new NodeCache();
  }

  has(key) {
    let attribute = this.cache.has(key)
    return attribute;
  }

  get(key) {
    const value = this.cache.get(key);
    // console.log(value, "\n value");
    return value
  }

  set(key, value, ttl) {
    return this.cache.set(key, value, ttl)
  }

  del(keys) {
    this.cache.del(keys);
  }

  flush() {
    this.cache.flushAll();
  }

  getTtl(key) {
    return this.cache.getTtl(key);
  }

  keys() {
    return this.cache.keys()
  }
}

const cache = new Cache();


async function viewManager(_id, userId, type) {
  try {
    let key = `${_id}` + `${userId}`
    // console.log("key:::::::::::::::::::::: ", key)
    let exists = await cache.has(key)
    // console.log("exists::::::::::::::::::::::: ",exists)

    let data = {
      assetId: _id,
      userId: userId,
      type: type
    }

    let userDetails = await dbInstance.getUserById(userId)

    let ageCategory;
    let country;
    let gender;
    let age;
    if ("birthYear" in userDetails) {
      let currentYear = new Date().getFullYear()
      age = currentYear - userDetails.birthYear
    }

    if (age < 18) {
      ageCategory = "<18 years"
    } else if (age >= 18 && age <= 45) {
      ageCategory = "18-45 years"
    } else if (age > 45) {
      ageCategory = ">45 years"
    } else {
      ageCategory = "18-45 years"
    }

    if ("country" in userDetails) {
      if (userDetails.country.length > 0) {
        country = userDetails.country
      }
    }

    if ("gender" in userDetails) {
      if (userDetails.gender.length > 0) {
        gender = userDetails.gender
      }
    }

    data.gender = gender;
    data.country = country;
    data.ageCategory = ageCategory;

    if (!exists) {
      let status = await cache.set(key, type, 30 * 60)
      // console.log(status, "status");
      await dbInstance.insertDocument(COLLECTIONS.VIEW_COLLECTION_NAME, data);
      // await dbInstanceMusic.updateViews(_id);
    }
    // console.log("KEYS:::::::::::\n", cache.keys(), cache.get(key))
    return
  }
  catch (e) {
    throw e
  }
}


async function marketCap(key) {
  try {
    let exists = cache.has(key)
    if (!exists) {
      let url = "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=4642&range=1D";

      let result = await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });

      let maticUrl = "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=3890&range=1D";
      let maticResult = await fetch(maticUrl)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });

      let response = { result, maticResult }
      // console.log(Object.keys(response.result))
      // console.log(Object.keys(response.maticResult))

      await cache.set(key, JSON.stringify(response), 10 * 60)

      return response
    }
    let response = cache.get(key)
    return JSON.parse(response)
  }
  catch (e) {
    throw e
  }
}

const getMostTipped = async (key, put, response) => {
  try {
    if (put == true) {
      console.log("Here Now")
      cache.set(key, JSON.stringify(response), 60)
      return
    }
    let exists = cache.has(key)
    if (!exists) {
      console.log("Doesn't exist")
      return false
    }
    else {
      let response = cache.get(key)
      console.log(response, "Got response")
      return JSON.parse(response)
    }
  }
  catch (e) {
    console.error('ERROR ::::: ', e)
    throw e
  }
}


module.exports = {
  Cache,
  viewManager,
  marketCap,
  getMostTipped
}
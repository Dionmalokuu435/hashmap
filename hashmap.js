class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  set(key, value) {
    const index = this.hash(key);
    this.checkIndex(index);

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.size++;

    if (this.size > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];
    if (!bucket) return null;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].value;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys() {
    const allKeys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          allKeys.push(bucket[j].key);
        }
      }
    }

    return allKeys;
  }

  values() {
    const allValues = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          allValues.push(bucket[j].value);
        }
      }
    }

    return allValues;
  }

  entries() {
    const allEntries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          allEntries.push([bucket[j].key, bucket[j].value]);
        }
      }
    }

    return allEntries;
  }

  resize() {
    const oldBuckets = this.buckets;

    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (let i = 0; i < oldBuckets.length; i++) {
      const bucket = oldBuckets[i];

      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          this.set(bucket[j].key, bucket[j].value);
        }
      }
    }
  }
}

// TESTING
const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length()); // 12
console.log(test.entries());

test.set("apple", "green");
test.set("banana", "gold");

console.log(test.get("apple")); // green
console.log(test.get("banana")); // gold
console.log(test.length()); // 12

test.set("moon", "silver");

console.log(test.length()); // 13
console.log(test.capacity); // 32
console.log(test.has("moon")); // true
console.log(test.remove("dog")); // true
console.log(test.has("dog")); // false
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
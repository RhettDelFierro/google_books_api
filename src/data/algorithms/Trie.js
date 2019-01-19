function findAllWords(node, arr) {
  if (node.end) {
    arr.unshift(node.getWord());
  }

  for (var child in node.children) {
    findAllWords(node.children[child], arr);
  }
}

export class TrieNode {
  constructor(key) {
    this.key = key;
    this.parent = null;
    this.children = {};
    this.end = false;
  }

  getWord() {
    const output = [];
    let node = this;

    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }

    return output.join('');
  };
}

export class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word) {
    let node = this.root;
    for (var i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);

        node.children[word[i]].parent = node;
      }

      node = node.children[word[i]];

      if (i == word.length - 1) {
        node.end = true;
      }
    }
  }

  contains(word) {
    let node = this.root;

    for (var i = 0; i < word.length; i++) {
      if (node.children[word[i]]) {
        node = node.children[word[i]];
      } else {
        return false;
      }
    }

    return node.end;
  }

  find(prefix) {
    let node = this.root;
    const output = [];

    for (var i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        return output;
      }
    }

    findAllWords(node, output);

    return output;
  }

}

module.exports = Trie
// -----------------------------------------

// instantiate our trie
// var trie = new Trie();
//
// // insert few values
// trie.insert("hello");
// trie.insert("helium");
// trie.insert("kickass");
// trie.insert("kisad,fasd");
//
// // check contains method
// console.log(trie.contains("helium"));  // true
// console.log(trie.contains("kickass")); // false
//
// // check find method
// console.log(trie.find("hel"));  // [ 'helium', 'hello' ]
// console.log(trie.find("ki")); // [ 'kisad,fasd', 'kickass' ]

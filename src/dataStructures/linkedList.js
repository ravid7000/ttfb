class Node {
  constructor(data) {
    this.value = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(data) {
    const node = new Node(data);

    if (this.head === null) {
      this.head = node;
      return this;
    }

    let head = this.head;
    while (head.next) {
      head = head.next;
    }

    head.next = node;

    return this;
  }

  print() {
    let head = this.head;
    let list = [];
    while (head) {
      list.push(head.value);
      head = head.next;
    }

    console.log(list.join(" -> "), "-> null");
  }
}

let linkedList = new LinkedList();

linkedList.add(10).add(15).add(20).add(25).add(30);

linkedList.print();

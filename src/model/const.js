const testListSimple = {
  _id: '6730844b186b65c26abc2a82',
  index: 0,
  guid: '368e49f1-328c-468f-b854-691230547103',
  isActive: true,
  balance: '$3,422.85',
  picture: 'http://placehold.it/32x32'
}

const testListComplex = {
  _id: '6730844b186b65c26abc2a82',
  index: 0,
  guid: '368e49f1-328c-468f-b854-691230547103',
  isActive: true,
  balance: '$3,422.85',
  picture: 'http://placehold.it/32x32',
  age: 39,
  tags: [
    'sunt',
    'labore',
    'nostrud',
    'consequat',
  ],
  // friends: [
  //   {
  //     id: 0,
  //     name: 'Hodge Gibson',
  //   },
  //   {
  //     id: 1,
  //     name: 'Madden Faulkner',
  //   },
  //   {
  //     id: 2,
  //     name: 'Watson Matthews',
  //   },
  // ],
  test: [
    {
      id1: 0,
    },
    {
      id2: 1,
    },
    {
      id3: 3,
    },
  ],
  greeting: 'Hello, Monica Justice! You have 9 unread messages.',
  favoriteFruit: 'banana',
};

export { testListSimple, testListComplex };

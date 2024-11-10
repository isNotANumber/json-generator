const defaultListState = [
  {
    id: '0',
    key: '',
    value: '',
  },
];

const testList1 = [
  {
    id: '1',
    key: 'bla1',
    value: 'blablabla1',
  },
  {
    id: '2',
    key: 'bla2',
    value: [
      {
        id: '15',
        key: 'bla15',
        value: 'blablabla15',
      },
    ],
  },
  {
    id: '3',
    key: 'bla3',
    value: [
      {
        id: '47',
        key: 'bla47',
        value: 'blablabla47',
      },
    ],
  },
  {
    id: '50',
    key: 'bla50',
    value: 'blablabla50',
  },
];

const testList2 = [
  {
    id: '1',
    key: 'bla1',
    value: [
      {
        id: '2',
        key: 'bla2',
        value: [
          {
            id: '15',
            key: 'bla15',
            value: 'blablabla15',
          },
        ],
      },
      {
        id: '3',
        key: 'bla3',
        value: [
          {
            id: '47',
            key: 'bla47',
            value: 'blablabla47',
          },
          {
            id: '48',
            key: 'bla48',
            value: 'blablabla48',
          },
        ],
      },
      {
        id: '50',
        key: 'bla50',
        value: 'blablabla50',
      },
    ],
  },
];

const testList3 = {
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
    'laborum',
    'velit',
    'cupidatat',
  ],
  friends: [
    {
      id: 0,
      name: 'Hodge Gibson',
    },
    {
      id: 1,
      name: 'Madden Faulkner',
    },
    {
      id: 2,
      name: 'Watson Matthews',
    },
  ],
  greeting: 'Hello, Monica Justice! You have 9 unread messages.',
  favoriteFruit: 'banana',
};

export { defaultListState, testList1, testList2, testList3 };

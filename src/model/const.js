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

export { defaultListState, testList1, testList2 };

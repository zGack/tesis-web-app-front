export interface user {
  userId:                string;
  personalId:            string;
  // username:              string;
  email:                 string;
  name:                  string;
  lastname:              string;
  estudiante:            boolean;
  roles:                 role[];
  enabled:               boolean;
}

interface role {
  roleId:      number;
  descripcion: string;
}

export interface AnteproyectoTable {
  anteproyectoId:          string;
  noRadicacion:            string;
  titulo:                  string;
  fechaEntregaAEvaluador:  Date | undefined;
  fechaEntregaDeEvaluador: Date | undefined;
  fechaCreacion:           Date;
  fechaAprobacion:         Date | undefined;
  noEntrega:               number;
  estado:                  number;
  autores:                 user[];
  evaluadores:             user[];
  directores:              user[];
}

export type ValidAnteproyectoStatus = 'pendiente' | 'aprobado' | 'no aprobado';

export const anteproyectoDataTable: AnteproyectoTable[] = [
  {
    anteproyectoId: "25",
    noRadicacion: "1224",
    noEntrega: 2,
    titulo: 'Sistema Gestor de Proyectos de Grado',
    fechaEntregaAEvaluador: new Date("2023-07-21"),
    fechaEntregaDeEvaluador: new Date("2023-07-30"),
    fechaCreacion: new Date("2023-06-15"),
    fechaAprobacion: new Date("2023-09-15"),
    estado: 1,
    autores: [
      {
        userId: "1",
        personalId: "8947234",
        email: "sebasmenfe99@javerianacali.edu.co",
        name: "Sebastian",
        lastname: "Mena Ferreira",
        estudiante: true,
        roles: [
          {
            roleId: 2,
            descripcion: "ESTUDIANTE"
          }
        ],
        enabled: true,
      },
      {
        userId: "2",
        personalId: "8947440",
        email: "paulmartinez@javerianacali.edu.co",
        name: "Paul Harvey",
        lastname: "Martinez",
        estudiante: true,
        roles: [
          {
            roleId: 2,
            descripcion: "ESTUDIANTE"
          }
        ],
        enabled: true,
      },
    ],
    evaluadores: [
      {
        userId: "3",
        personalId: "699412",
        email: "juancmartinez@javerianacali.edu.co",
        name: "Juan Carlos",
        lastname: "Martinez",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
    ],
    directores: [
      {
        userId: "5",
        personalId: "699412",
        email: "gmsarria@javerianacali.edu.co",
        name: "Gerardo",
        lastname: "Sarria",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "DIRECTOR"
          }
        ],
        enabled: true,
      },
    ]
  },
  {
    anteproyectoId: "23",
    noRadicacion: "1089",
    noEntrega: 3,
    titulo: 'Implementación de una aplicación web que facilite el uso de técnicas de reducción de casos de prueba del software',
    fechaEntregaAEvaluador: new Date("2023-07-21"),
    fechaEntregaDeEvaluador: undefined,
    fechaCreacion: new Date("2023-06-15"),
    fechaAprobacion: undefined,
    estado: 2,
    autores: [
      {
        userId: "3",
        personalId: "8948297",
        email: "abeltran@javerianacali.edu.co",
        name: "Alejandro",
        lastname: "Beltran Zuluaga",
        estudiante: true,
        roles: [
          {
            roleId: 2,
            descripcion: "ESTUDIANTE"
          }
        ],
        enabled: true,
      },
      {
        userId: "4",
        personalId: "8948106",
        email: "ghipiam@javerianacali.edu.co",
        name: "Geiler Orlando",
        lastname: "Hipia Mejia",
        estudiante: true,
        roles: [
          {
            roleId: 2,
            descripcion: "ESTUDIANTE"
          }
        ],
        enabled: true,
      },
    ],
    evaluadores: [
      {
        userId: "3",
        personalId: "699412",
        email: "cramirez@javerianacali.edu.co",
        name: "Carlos",
        lastname: "Ramirez",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
    ],
    directores: [
      {
        userId: "3",
        personalId: "699412",
        email: "juanpgarcia@javerianacali.edu.co",
        name: "Juan Pablo",
        lastname: "Garcia",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
    ]
  },
  {
    anteproyectoId: "1",
    noRadicacion: "00001",
    titulo: "Degree Project 1",
    fechaCreacion: new Date("2020-01-01"),
    fechaEntregaAEvaluador: undefined,
    fechaEntregaDeEvaluador: undefined,
    fechaAprobacion: undefined,
    noEntrega: 1,
    estado: 2,
    autores: [
      {
        name: "John",
        lastname: "Doe",
        email: "johndoe@javerianacali.edu.co",
        userId: "123456",
        personalId: "9876543",
        enabled: true,
        roles: [
          {
            roleId: 2,
            descripcion: "ESTUDIANTE"
          }
        ],
        estudiante: true,
      },
      ],
    directores: [
      {
        name: "Matthew",
        lastname: "Anderson",
        email: "matthewanderson@javerianacali.edu.co",
        userId: "123450",
        personalId: "9876543",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "DIRECTOR"
          }
        ],
        enabled: true,
      },
    ],
    evaluadores: [
      {
        name: "Victoria",
        lastname: "Martin",
        email: "victoriamartin@javerianacali.edu.co",
        userId: "678905",
        personalId: "4321098",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
      {
        name: "James",
        lastname: "Thompson",
        email: "jamesthompson@javerianacali.edu.co",
        userId: "789016",
        personalId: "3210987",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
    ],
  },
  {
    anteproyectoId: "2",
    noRadicacion: "00002",
    titulo: "Degree Project 2",
    fechaCreacion: new Date("2020-01-02"),
    fechaEntregaAEvaluador: new Date("2020-01-02"),
    fechaEntregaDeEvaluador: new Date("2020-01-03"),
    fechaAprobacion: new Date("2020-01-04"),
    noEntrega: 2,
    estado: 3,
    autores: [
        {
        name: "Jane",
        lastname: "Smith",
        email: "janesmith@javerianacali.edu.co",
        userId: "234567",
        personalId: "8765432",
        enabled: true,
            roles: [
              {
                roleId: 2,
                descripcion: "ESTUDIANTE"
              }
            ],
            estudiante: true,
      },
    ],
    directores: [
      {
        name: "Olivia",
        lastname: "Thomas",
        email: "oliviathomas@javerianacali.edu.co",
        userId: "234561",
        personalId: "8765432",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "DIRECTOR"
          }
        ],
        enabled: true,
      },
    ],
    evaluadores: [
      {
        name: "Samantha",
        lastname: "Garcia",
        email: "samanthagarcia@javerianacali.edu.co",
        userId: "890127",
        personalId: "2109876",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
      {
        name: "Joseph",
        lastname: "Rodriguez",
        email: "josephrodriguez@javerianacali.edu.co",
        userId: "901238",
        personalId: "1098765",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
    ],
  },
  {
    anteproyectoId: "3",
    noRadicacion: "00003",
    titulo: "Degree Project 3",
    fechaCreacion: new Date("2020-01-01"),
    fechaEntregaAEvaluador: new Date("2020-01-04"),
    fechaEntregaDeEvaluador: new Date("2020-01-05"),
    fechaAprobacion: new Date("2020-01-06"),
    noEntrega: 0,
    estado: 1,
    autores: [
      {
        name: "David",
        lastname: "Johnson",
        email: "davidjohnson@javerianacali.edu.co",
        userId: "345678",
        personalId: "7654321",
        enabled: true,
            roles: [
              {
                roleId: 2,
                descripcion: "ESTUDIANTE"
              }
            ],
            estudiante: true,
      },
    ],
    directores: [
      {
        name: "Andrew",
        lastname: "Jackson",
        email: "andrewjackson@javerianacali.edu.co",
        userId: "345672",
        personalId: "7654321",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "DIRECTOR"
          }
        ],
        enabled: true,
      },
      {
        name: "Sophia",
        lastname: "White",
        email: "sophiawhite@javerianacali.edu.co",
        userId: "456783",
        personalId: "6543210",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "DIRECTOR"
          }
        ],
        enabled: true,
      },
    ],
    evaluadores: [
      {
        name: "James",
        lastname: "Thompson",
        email: "jamesthompson@javerianacali.edu.co",
        userId: "789016",
        personalId: "3210987",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
    ]
  },
  {
    anteproyectoId: "4",
    noRadicacion: "00004",
    titulo: "Degree Project 4",
    fechaCreacion: new Date("2020-01-01"),
    fechaEntregaAEvaluador: new Date("2020-01-04"),
    fechaEntregaDeEvaluador: new Date("2020-01-05"),
    fechaAprobacion: new Date("2020-01-06"),
    noEntrega: 3,
    estado: 2,
    autores: [
      {
        name: "Michael",
        lastname : "Brown",
        email: "michaelbrown@javerianacali.edu.co",
        userId: "567890",
        personalId: "5432109",
        enabled: true,
            roles: [
              {
                roleId: 2,
                descripcion: "ESTUDIANTE"
              }
            ],
            estudiante: true,
      },
    ],
    directores: [
      {
        name: "Sophia",
        lastname: "White",
        email: "sophiawhite@javerianacali.edu.co",
        userId: "456783",
        personalId: "6543210",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "DIRECTOR"
          }
        ],
        enabled: true,
      },
    ],
    evaluadores: [
      {
        name: "Samantha",
        lastname: "Garcia",
        email: "samanthagarcia@javerianacali.edu.co",
        userId: "890127",
        personalId: "2109876",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
      {
        name: "Joseph",
        lastname: "Rodriguez",
        email: "josephrodriguez@javerianacali.edu.co",
        userId: "901238",
        personalId: "1098765",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      },
      {
        name: "Abigail",
        lastname: "Lopez",
        email: "abigaillopez@javerianacali.edu.co",
        userId: "012349",
        personalId: "0987654",
        estudiante: false,
        roles: [
          {
            roleId: 3,
            descripcion: "EVALUADOR"
          }
        ],
        enabled: true,
      }
    ]
  },
  // {
  //   anteproyectoId: "5",
  //   noRadicacion: "00005",
  //   titulo: "Degree Project 5",
  //   fechaCreacion: "05/01/2020",
  //   fechaEntregaAEvaluador: "06/01/2020",
  //   fechaEntregaDeEvaluador: "07/01/2020",
  //   fechaAprobacion: "08/01/2020",
  //   noEntrega: 1,
  //   estado: 3,
  //   autores: [
  //     {
  //       name: "Linda",
  //       lastname: "Jones",
  //       email: "lindajones@javerianacali.edu.co",
  //       userId: "678901",
  //       personalId: "4321098",
  //       enabled: true,
  //           roles: [
  //             {
  //               roleId: 2,
  //               descripcion: "ESTUDIANTE"
  //             }
  //           ],
  //           estudiante: true,
  //     },
  //     {
  //       name: "Christopher",
  //       lastname: "Miller",
  //       email: "christophermiller@javerianacali.edu.co",
  //       userId: "789012",
  //       personalId: "3210987",
  //       enabled: true,
  //           roles: [
  //             {
  //               roleId: 2,
  //               descripcion: "ESTUDIANTE"
  //             }
  //           ],
  //           estudiante: true,
  //     },
  //   ],
  //   directores: [
  //     {
  //       name: "Sophia",
  //       lastname: "White",
  //       email: "sophiawhite@javerianacali.edu.co",
  //       userId: "456783",
  //       personalId: "6543210",
  //       estudiante: false,
  //       roles: [
  //         {
  //           roleId: 3,
  //           descripcion: "DIRECTOR"
  //         }
  //       ],
  //       enabled: true,
  //     },
  //   ],
  //   evaluadores: [
  //     {
  //       name: "James",
  //       lastname: "Thompson",
  //       email: "jamesthompson@javerianacali.edu.co",
  //       userId: "789016",
  //       personalId: "3210987",
  //       estudiante: false,
  //       roles: [
  //         {
  //           roleId: 3,
  //           descripcion: "EVALUADOR"
  //         }
  //       ],
  //       enabled: true,
  //     },
  //     {
  //       name: "Samantha",
  //       lastname: "Garcia",
  //       email: "samanthagarcia@javerianacali.edu.co",
  //       userId: "890127",
  //       personalId: "2109876",
  //       estudiante: false,
  //       roles: [
  //         {
  //           roleId: 3,
  //           descripcion: "EVALUADOR"
  //         }
  //       ],
  //       enabled: true,
  //     },
  //   ]
  // },
  // {
  //   anteproyectoId: "6",
  //   noRadicacion: "00006",
  //   titulo: "Degree Project 6",
  //   fechaCreacion: "06/01/2020",
  //   fechaEntregaAEvaluador: "07/01/2020",
  //   fechaEntregaDeEvaluador: "08/01/2020",
  //   fechaAprobacion: "09/01/2020",
  //   noEntrega: 2,
  //   estado: 1,
  //   autores: [
  //     {
  //       name: "Emily",
  //       lastname: "Taylor",
  //       email: "emilytaylor@javerianacali.edu.co",
  //       userId: "012345",
  //       personalId: "0987654",
  //       enabled: true,
  //           roles: [
  //             {
  //               roleId: 2,
  //               descripcion: "ESTUDIANTE"
  //             }
  //           ],
  //           estudiante: true,
  //     },
  //   ],
  //   directores: [
  //     {
  //       name: "Olivia",
  //       lastname: "Thomas",
  //       email: "oliviathomas@javerianacali.edu.co",
  //       userId: "234561",
  //       personalId: "8765432",
  //       estudiante: false,
  //       roles: [
  //         {
  //           roleId: 3,
  //           descripcion: "DIRECTOR"
  //         }
  //       ],
  //       enabled: true,
  //     },
  //     {
  //       name: "Andrew",
  //       lastname: "Jackson",
  //       email: "andrewjackson@javerianacali.edu.co",
  //       userId: "345672",
  //       personalId: "7654321",
  //       estudiante: false,
  //       roles: [
  //         {
  //           roleId: 3,
  //           descripcion: "DIRECTOR"
  //         }
  //       ],
  //       enabled: true,
  //     },
  //   ],
  //   evaluadores: [

  //   ],
  // },


  // {
  //   "anteproyectoId": "7",
  //   "noRadicacion": "00007",
  //   "title": "Degree Project 7",
  //   "fechaCreacion": "07/01/2020",
  //   "fechaEntregaAEvaluador": "08/01/2020",
  //   "fechaEntregaDeEvaluador": "09/01/2020",
  //   "fechaAprabacion": "10/01/2020",
  //   "noEntrega": 0,
  //   "estado": 2
  // },
  // {
  //   "anteproyectoId": "8",
  //   "noRadicacion": "00008",
  //   "title": "Degree Project 8",
  //   "fechaCreacion": "08/01/2020",
  //   "fechaEntregaAEvaluador": "09/01/2020",
  //   "fechaEntregaDeEvaluador": "10/01/2020",
  //   "fechaAprabacion": "11/01/2020",
  //   "noEntrega": 3,
  //   "estado": 3
  // },
  // {
  //   "anteproyectoId": "9",
  //   "noRadicacion": "00009",
  //   "title": "Degree Project 9",
  //   "fechaCreacion": "09/01/2020",
  //   "fechaEntregaAEvaluador": "10/01/2020",
  //   "fechaEntregaDeEvaluador": "11/01/2020",
  //   "fechaAprabacion": "12/01/2020",
  //   "noEntrega": 1,
  //   "estado": 1
  // },
  // {
  //   "anteproyectoId": "10",
  //   "noRadicacion": "00010",
  //   "title": "Degree Project 10",
  //   "fechaCreacion": "10/01/2020",
  //   "fechaEntregaAEvaluador": "11/01/2020",
  //   "fechaEntregaDeEvaluador": "12/01/2020",
  //   "fechaAprabacion": "13/01/2020",
  //   "noEntrega": 2,
  //   "estado": 2
  // },
  // {
  //   "anteproyectoId": "11",
  //   "noRadicacion": "00011",
  //   "title": "Degree Project 11",
  //   "fechaCreacion": "11/01/2020",
  //   "fechaEntregaAEvaluador": "12/01/2020",
  //   "fechaEntregaDeEvaluador": "13/01/2020",
  //   "fechaAprabacion": "14/01/2020",
  //   "noEntrega": 0,
  //   "estado": 3
  // },
  // {
  //   "anteproyectoId": "12",
  //   "noRadicacion": "00012",
  //   "title": "Degree Project 12",
  //   "fechaCreacion": "12/01/2020",
  //   "fechaEntregaAEvaluador": "13/01/2020",
  //   "fechaEntregaDeEvaluador": "14/01/2020",
  //   "fechaAprabacion": "15/01/2020",
  //   "noEntrega": 3,
  //   "estado": 1
  // },
  // {
  //   "anteproyectoId": "13",
  //   "noRadicacion": "00013",
  //   "title": "Degree Project 13",
  //   "fechaCreacion": "13/01/2020",
  //   "fechaEntregaAEvaluador": "14/01/2020",
  //   "fechaEntregaDeEvaluador": "15/01/2020",
  //   "fechaAprabacion": "16/01/2020",
  //   "noEntrega": 1,
  //   "estado": 2
  // },
  // {
  //   "anteproyectoId": "14",
  //   "noRadicacion": "00014",
  //   "title": "Degree Project 14",
  //   "fechaCreacion": "14/01/2020",
  //   "fechaEntregaAEvaluador": "15/01/2020",
  //   "fechaEntregaDeEvaluador": "16/01/2020",
  //   "fechaAprabacion": "17/01/2020",
  //   "noEntrega": 2,
  //   "estado": 3
  // },
  // {
  //   "anteproyectoId": "15",
  //   "noRadicacion": "00015",
  //   "title": "Degree Project 15",
  //   "fechaCreacion": "15/01/2020",
  //   "fechaEntregaAEvaluador": "16/01/2020",
  //   "fechaEntregaDeEvaluador": "17/01/2020",
  //   "fechaAprabacion": "18/01/2020",
  //   "noEntrega": 0,
  //   "estado": 1
  // },
  // {
  //   "anteproyectoId": "16",
  //   "noRadicacion": "00016",
  //   "title": "Degree Project 16",
  //   "fechaCreacion": "16/01/2020",
  //   "fechaEntregaAEvaluador": "17/01/2020",
  //   "fechaEntregaDeEvaluador": "18/01/2020",
  //   "fechaAprabacion": "19/01/2020",
  //   "noEntrega": 3,
  //   "estado": 2
  // },
  // {
  //   "anteproyectoId": "17",
  //   "noRadicacion": "00017",
  //   "title": "Degree Project 17",
  //   "fechaCreacion": "17/01/2020",
  //   "fechaEntregaAEvaluador": "18/01/2020",
  //   "fechaEntregaDeEvaluador": "19/01/2020",
  //   "fechaAprabacion": "20/01/2020",
  //   "noEntrega": 1,
  //   "estado": 3
  // },
  // {
  //   "anteproyectoId": "18",
  //   "noRadicacion": "00018",
  //   "title": "Degree Project 18",
  //   "fechaCreacion": "18/01/2020",
  //   "fechaEntregaAEvaluador": "19/01/2020",
  //   "fechaEntregaDeEvaluador": "20/01/2020",
  //   "fechaAprabacion": "21/01/2020",
  //   "noEntrega": 2,
  //   "estado": 1
  // },
  // {
  //   "anteproyectoId": "19",
  //   "noRadicacion": "00019",
  //   "title": "Degree Project 19",
  //   "fechaCreacion": "19/01/2020",
  //   "fechaEntregaAEvaluador": "20/01/2020",
  //   "fechaEntregaDeEvaluador": "21/01/2020",
  //   "fechaAprabacion": "22/01/2020",
  //   "noEntrega": 0,
  //   "estado": 2
  // },
  // {
  //   "anteproyectoId": "20",
  //   "noRadicacion": "00020",
  //   "title": "Degree Project 20",
  //   "fechaCreacion": "20/01/2020",
  //   "fechaEntregaAEvaluador": "21/01/2020",
  //   "fechaEntregaDeEvaluador": "22/01/2020",
  //   "fechaAprabacion": "23/01/2020",
  //   "noEntrega": 3,
  //   "estado": 3
  // }
]
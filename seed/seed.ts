type ValidRoles = 'admin' | 'estudiante' | 'evaluador' | 'director' | 'jurado';
type ValidGrades = 'pregrado' | 'especializacion' | 'maestria' | 'doctorado';

interface SeedUser {
  name:                  string;
  email:                 string;
  lastname:              string;
  password:              string;
  role:                  ValidRoles[] | undefined;
  active:                boolean | undefined;
}

export interface SeedAnteproyecto {
  noRadicacion:            number;
  titulo:                  string;
  fechaEntregaAEvaluador:  Date | null;
  fechaEntregaDeEvaluador: Date | null;
  fechaCreacion:           Date;
  fechaAprobacion:         Date | null;
  noEntrega:               number;
  estado:                  number;
  slug:                    string;
  users:                   {email: string, role: ValidRoles}[];
}

interface SeedTrabajoDeGrado {
  periodo:                 string;
  noAct:                   string;
  titulo:                  string;
  mensionHonor:            boolean;
  notaDefinitiva:          number | undefined;
  gradoPostular:           ValidGrades;
  fechaSutentacion:        Date | undefined;
  users:                   string[];
  anteproyecto:            string; 
}

interface SeedData {
  users: SeedUser[];
  anteproyectos: SeedAnteproyecto[];
  trabajosDeGrados: SeedTrabajoDeGrado[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "sebasmenfe99@javerianacali.edu.co",
      name: "Sebastian",
      lastname: "Mena Ferreira",
      password: '123123',
      role: ['estudiante'],
      active: true,
    },
    {
      email: "paulmartinez@javerianacali.edu.co",
      name: "Paul Harvey",
      lastname: "Martinez",
      password: '123123',
      role: ['estudiante'],
      active: true
    },
    {
      email: "geilerhipia@javerianacali.edu.co",
      name: "Geiler Orlando",
      lastname: "Hipia",
      password: '123123',
      role: ['estudiante'],
      active: true,
    },
    {
      email: "alejobeltran@javerianacali.edu.co",
      name: "Alejandro",
      lastname: "Beltran",
      password: '123123',
      role: ['estudiante'],
      active: true,
    },
    {
      email: "juancmartinez@javerianacali.edu.co",
      name: "Juan Carlos",
      lastname: "Martinez",
      password: '123123',
      role: ['evaluador', 'jurado'],
      active: true,
    },
    {
      email: "gmsarria@javerianacali.edu.co",
      name: "Gerardo",
      lastname: "Sarria",
      password: '123123',
      role: ['director'],
      active: true,
    },
    {
      email: "cramirez@javerianacali.edu.co",
      name: "Carlos",
      lastname: "Ramirez",
      password: '123123',
      role: ['evaluador','jurado'],
      active: true,
    },
    {
      name: "John",
      lastname: "Doe",
      email: "johndoe@javerianacali.edu.co",
      password: '123123',
      role: ['estudiante'],
      active: true,
    },
    {
      name: "Matthew",
      lastname: "Anderson",
      email: "matthewanderson@javerianacali.edu.co",
      password: '123123',
      role: ['director'],
      active: true,
    },
    {
      name: "Victoria",
      lastname: "Martin",
      email: "victoriamartin@javerianacali.edu.co",
      password: '123321',
      role: ['evaluador'],
      active: true,
    },
    {
      name: "James",
      lastname: "Thompson",
      email: "jamesthompson@javerianacali.edu.co",
      password: '123321',
      role: ['evaluador'],
      active: true,
    },
    {
      name: "Jane",
      lastname: "Smith",
      email: "janesmith@javerianacali.edu.co",
      password: "123321",
      active: true,
      role: ['estudiante'],
    },
    {
      name: "Olivia",
      lastname: "Thomas",
      email: "oliviathomas@javerianacali.edu.co",
      password: '123321',
      role: ['director'],
      active: true,
    },
    {
      name: "Samantha",
      lastname: "Garcia",
      email: "samanthagarcia@javerianacali.edu.co",
      password: "123321",
      role: ['evaluador'],
      active: true,
    },
    {
      name: "Joseph",
      lastname: "Rodriguez",
      email: "josephrodriguez@javerianacali.edu.co",
      password: "123321",
      role: ['evaluador'],
      active: true,
    },
    {
      name: "David",
      lastname: "Johnson",
      email: "davidjohnson@javerianacali.edu.co",
      password: '123321',
      active: true,
      role: ['estudiante'],
    },
    {
      name: "Andrew",
      lastname: "Jackson",
      email: "andrewjackson@javerianacali.edu.co",
      password: '123321',
      role: ['director'],
      active: true,
    },
    {
      name: "Sophia",
      lastname: "White",
      email: "sophiawhite@javerianacali.edu.co",
      password: '123321',
      active: true,
      role: ['director'],
    },
    {
      name: "Michael",
      lastname : "Brown",
      email: "michaelbrown@javerianacali.edu.co",
      password: '123321',
      active: true,
      role: ['estudiante'],
    },
    {
      name: "Abigail",
      lastname: "Lopez",
      email: "abigaillopez@javerianacali.edu.co",
      password: '123321',
      role: ['evaluador'],
      active: true,
    }
  ],
  anteproyectos: [
    {
      noRadicacion: 1224,
      noEntrega: 2,
      titulo: 'Sistema Gestor de Proyectos de Grado',
      slug: 'sistema_gestor_de_proyectos_de_grado',
      fechaEntregaAEvaluador: new Date("2023-07-21"),
      fechaEntregaDeEvaluador: new Date("2023-07-30"),
      fechaCreacion: new Date("2023-06-15"),
      fechaAprobacion: new Date("2023-09-15"),
      estado: 1,
      users: [
        {
          email: "sebasmenfe99@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "paulmartinez@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "gmsarria@javerianacali.edu.co",
          role: 'director'
        },
        {
          email: "juancmartinez@javerianacali.edu.co",
          role: 'evaluador'
        },
      ]
    },
    {
      noRadicacion: 1089,
      noEntrega: 3,
      titulo: 'Implementación de una aplicación web que facilite el uso de técnicas de reducción de casos de prueba del software',
      slug: 'implemntacion_de_una_aplicacion_web_que_facilita_el_uso_de_tecnicas_de_reduccion_de_casos_de_prueba_del_software',
      fechaEntregaAEvaluador: new Date("2023-07-21"),
      fechaEntregaDeEvaluador: null,
      fechaCreacion: new Date("2023-06-15"),
      fechaAprobacion: null,
      estado: 2,
      users: [
        {
          email: "geilerhipia@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "alejobeltran@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "juancmartinez@javerianacali.edu.co",
          role: 'director'
        },
        {
          email: "cramirez@javerianacali.edu.co",
          role: 'evaluador'
        },
      ]
    },
    {
      noRadicacion: 20001,
      titulo: "Degree Project 1",
      slug: 'degree_project_1',
      fechaCreacion: new Date("2020-01-01"),
      fechaEntregaAEvaluador: null,
      fechaEntregaDeEvaluador: null,
      fechaAprobacion: null,
      noEntrega: 1,
      estado: 2,
      users: [
        {
          email: "johndoe@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "matthewanderson@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "victoriamartin@javerianacali.edu.co",
          role: 'director'
        },
        {
          email: "jamesthompson@javerianacali.edu.co",
          role: 'evaluador'
        },
      ]
    },
    {
      noRadicacion: 20002,
      titulo: "Degree Project 2",
      slug: 'degree_project_2',
      fechaCreacion: new Date("2020-01-02"),
      fechaEntregaAEvaluador: new Date("2020-01-02"),
      fechaEntregaDeEvaluador: new Date("2020-01-03"),
      fechaAprobacion: new Date("2020-01-04"),
      noEntrega: 2,
      estado: 3,
      users: [
        {
          email: "janesmith@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "oliviathomas@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "samanthagarcia@javerianacali.edu.co",
          role: 'director'
        },
        {
          email: "josephrodriguez@javerianacali.edu.co",
          role: 'evaluador'
        },
      ]
    },
    {
      noRadicacion: 20003,
      titulo: "Degree Project 3",
      slug: 'degree_project_3',
      fechaCreacion: new Date("2020-01-01"),
      fechaEntregaAEvaluador: new Date("2020-01-04"),
      fechaEntregaDeEvaluador: new Date("2020-01-05"),
      fechaAprobacion: new Date("2020-01-06"),
      noEntrega: 0,
      estado: 1,
      users: [
        {
          email: "davidjohnson@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "andrewjackson@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "victoriamartin@javerianacali.edu.co",
          role: 'director'
        },
        {
          email:"jamesthompson@javerianacali.edu.co",
          role: 'evaluador'
        },
      ]
    },
    {
      noRadicacion: 20004,
      titulo: "Degree Project 4",
      slug: 'degree_project_4',
      fechaCreacion: new Date("2020-01-01"),
      fechaEntregaAEvaluador: new Date("2020-01-04"),
      fechaEntregaDeEvaluador: new Date("2020-01-05"),
      fechaAprobacion: new Date("2020-01-06"),
      noEntrega: 3,
      estado: 2,
      users: [
        {
          email: "sophiawhite@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "abigaillopez@javerianacali.edu.co",
          role: 'estudiante'
        },
        {
          email: "michaelbrown@javerianacali.edu.co",
          role: 'director'
        },
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
  ],
  trabajosDeGrados: [
  {
    periodo: "2023-2",
    noAct: "3223",
    titulo: "Sistema Gestor de Proyectos de Grado",
    anteproyecto: 'sistema_gestor_de_proyectos_de_grado',
    mensionHonor: true,
    notaDefinitiva: 4.3,
    gradoPostular: 'pregrado',
    fechaSutentacion: new Date("2023-07-21"),
    users: [
      "sebasmenfe99@javerianacali.edu.co",
      "paulmartinez@javerianacali.edu.co",
      "juancmartinez@javerianacali.edu.co",
      "gmsarria@javerianacali.edu.co",
    ]
  },
  {
    periodo: "2023-1",
    noAct: "1111",
    titulo: 'Implementación de una aplicación web que facilite el uso de técnicas de reducción de casos de prueba del software',
    anteproyecto: 'implemntacion_de_una_aplicacion_web_que_facilita_el_uso_de_tecnicas_de_reduccion_de_casos_de_prueba_del_software',
    fechaSutentacion: new Date("2023-02-21"),
    notaDefinitiva: 4.5,
    mensionHonor: false,
    gradoPostular: 'pregrado',
    users: [
      "abeltran@javerianacali.edu.co",
      "ghipiam@javerianacali.edu.co",
      "cramirez@javerianacali.edu.co",
      "juanpgarcia@javerianacali.edu.co",
    ]
  },
  {
    periodo: "2019-2",
    noAct: "2222",
    titulo: "Degree Project 1",
    anteproyecto: 'degree_project_1',
    fechaSutentacion: new Date("2020-01-01"),
    mensionHonor: false,
    gradoPostular: 'especializacion',
    notaDefinitiva: 4.0,
    users: [
         "johndoe@javerianacali.edu.co",
         "matthewanderson@javerianacali.edu.co",
         "victoriamartin@javerianacali.edu.co",
         "jamesthompson@javerianacali.edu.co",
    ],
  }
  ]
}
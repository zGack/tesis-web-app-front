import { user } from ".";

export interface TrabajoGradoTable {
  trabajoGradoId:          string;
  periodo:                 string;
  noActa:                  string;
  titulo:                  string;
  mensionHonor:            boolean;
  notaDefinitiva:          string | undefined;
  gradoPostular:           GradosPostular;
  fechaSutentacion:        Date | undefined;
  autores:                 user[];
  directores:              user[];
  jurados:                 user[];
}

export type GradosPostular = 'pregrado' | 'maestría' | 'especialización' | 'doctorado';

export const trabajoDeGradoDataTable: TrabajoGradoTable[] = [
  {
    trabajoGradoId: "12344321",
    periodo: "2023-2",
    noActa: "3223",
    titulo: "Sistema Gestor de Proyectos de Grado",
    mensionHonor: true,
    notaDefinitiva: "4.3",
    gradoPostular: 'pregrado',
    fechaSutentacion: new Date("2023-07-21"),
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
    jurados: [
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
    trabajoGradoId: "23",
    periodo: "2023-1",
    noActa: "1111",
    titulo: 'Implementación de una aplicación web que facilite el uso de técnicas de reducción de casos de prueba del software',
    fechaSutentacion: new Date("2023-02-21"),
    notaDefinitiva: "4.5",
    mensionHonor: false,
    gradoPostular: 'pregrado',
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
    jurados: [
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
    trabajoGradoId: "1",
    periodo: "2019-2",
    noActa: "2222",
    titulo: "Degree Project 1",
    fechaSutentacion: new Date("2020-01-01"),
    mensionHonor: false,
    gradoPostular: 'especialización',
    notaDefinitiva: "4.0",
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
    jurados: [
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
  // {
  //   trabajoGradoId: "2",
  //   periodo: "2020-1",
  //   noActa: "3333",
  //   titulo: "Degree Project 2",
  //   fechaSutentacion: new Date("2020-01-02"),
  //   mensionHonor: true,
  //   notaDefinitiva: "4.1",
  //   gradoPostular: "doctorado",
  //   autores: [
  //       {
  //       name: "Jane",
  //       lastname: "Smith",
  //       email: "janesmith@javerianacali.edu.co",
  //       userId: "234567",
  //       personalId: "8765432",
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
  //   ],
  //   jurados: [
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
  //     {
  //       name: "Joseph",
  //       lastname: "Rodriguez",
  //       email: "josephrodriguez@javerianacali.edu.co",
  //       userId: "901238",
  //       personalId: "1098765",
  //       estudiante: false,
  //       roles: [
  //         {
  //           roleId: 3,
  //           descripcion: "EVALUADOR"
  //         }
  //       ],
  //       enabled: true,
  //     },
  //   ],
  // },
]
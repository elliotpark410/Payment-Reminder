import connection from "../connection";
import { decrypt } from "../../util/index";

export const studentsData = [
  {
    "student_name": "Soo Borson",
    "phone_number": "71ab3c6fd0256aad8a88bf6666772100",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Nick Korneff",
    "phone_number": "57bf878893e8527497d5e1d9d9810e0a",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Isaiah Lopez",
    "phone_number": "bebec38c155c57b4a5f6f91bf68ae761",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Maks Miner",
    "phone_number": "590248efb518ffe814b75047cfd0907e",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Richard Wong",
    "phone_number": "94ef16eb9f280fcaffb142bd6ed1557c",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Jake Tran",
    "phone_number": "b84d8e30353fa083834fe732dc79739c",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Alexis Mabugat",
    "phone_number": "3e919c903341acb5f3d2c8d28ad3c852",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Mina Deng",
    "phone_number": "8825047afe1571f0292e17c70d1df0e3",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Juliette Bordier-Johnson",
    "phone_number": "b82dde81bf2395b3684dd92197e78c10",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Lawrebce Abbott",
    "phone_number": "b85ac0edc9eeb388d7a40f6edb44afb0",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Stella Sandeina Achda",
    "phone_number": "c675e88d469692bd354938f225f794b6",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Kalaya Cadle",
    "phone_number": "06fcac77de5cdce4c287dc364e849db0",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Nili Wesolowski",
    "phone_number": "b0530778115ea3d2843a8593dd52d6c3",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Chris Sanchee",
    "phone_number": "c5b06ae325795fc10e701a69c97e3639",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Tao Keny",
    "phone_number": "d1ff5dacd9ca50ed59cc2a66ffa56334",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Valentino Cavarica",
    "phone_number": "f4b6a9b6d27779b74aca07d654453493",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Aiden Kim",
    "phone_number": "73ad18dba437b86d500d139b0097c4d2",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Leah Feigenbaum",
    "phone_number": "0cc39560562bb2875b02724190d09edd",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Edbert Feng",
    "phone_number": "113b22ec9f851741acd7bd8e04c29ba1",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Pieta Myka Baca",
    "parent_name": "Kimberly Baca",
    "phone_number": "8eff370bd886f0793f0f06feea5f4601",
    "email": "532e2c33c492482fde68c02d18b423b7a2e382f498eb3bb20cde46b005270898",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Sandra Mah",
    "phone_number": "f7c1154f0240c03e8601819f39bc5786",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Paige Choi",
    "parent_name": "Marie Anny Choi",
    "phone_number": "3158ccac25c9aed3104b880ec6b5be96",
    "email": "8384a8821d356c16b48c9046d15e3848827774bf57db62df621edde3886f7910",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Sarah Huang",
    "phone_number": "92095ea71261e8cfc7dec6929b5930a9",
    "email": "53324d076b5f73be154335b4cfc0d0a8b858e29aadb395793161c13dc6722fb9",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Serene Tan",
    "phone_number": "ac86a73d600df95f4082b2c041cd573e",
    "email": "f9c3f68332b844551a96e00380355e1617ebf0433e280d5a7a03688b7d5b8b9b",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Yui Tan",
    "phone_number": "8ce63f0dff393a31913f0cac93e76c9d",
    "email": "6915b41ea6153e95b85c6d907d81292f",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Jasmin Carrasco",
    "phone_number": "eebc5b87d3873ad45b6ae85b4b6f4724",
    "email": "90f2970660f17fda61b7db294c34e475a2ccb5df0c66c5e128acb17bfac1117b",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Ash Zhang",
    "parent_name": "Liz Qu",
    "phone_number": "a718a860c3a1f7d1fe57a2bfac3315ff",
    "email": "cc53c0f2798e2cb3416a6357891d81bd526faf95f202908373f1952bd6133107",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Daniel Beck",
    "phone_number": "20b9d75cff1d6dfa7d6638ae2f822555",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Bowei Deng",
    "phone_number": "1345c0a5e6128a52370543e6287a67c1",
    "email": "fbd159996fd9ab80bf25b582b4e260f494dfd5c0485ebaaa7d7b4a92a484e9c1",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Kris Mendez",
    "phone_number": "da2c233b0dec29664c5ecec316520c60",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Alex Cadena",
    "phone_number": "9af1adfbe181176f7093cc8be462a52a",
    "email": "5cc1ae24884f659cbd27dab24c60234cad7f990d654761c276598470b85decd3",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Leslie Wei",
    "parent_name": "Lu Kong",
    "phone_number": "34af2af71599c570d45fdcdcf3874d33",
    "email": "4461a86093e59518164e3166c41af84b715f0865272b1ed222ad587b8612079c",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Christine Jiang",
    "parent_name": "Jade Hui",
    "phone_number": "be3485b8c1734f84726d5bd65b6803ce",
    "email": "24f61bfc7f577da75b2b670ff736a2ef4b017ae2b992fa2473b62fb444e1020c",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Jacqueline Caldarella",
    "parent_name": "Cassandra Caldarella",
    "phone_number": "55c11d158492abcb65643d9b88d74313",
    "email": "c3884586fbedf9fcd47b1d961d3050a2a883b882ad6906a0b1001185c2f62a50",
    "subscription_price": 1800,
    "subscription_number": 13
  },
  {
    "student_name": "Jeffrey Eng",
    "parent_name": "Charlene Srivastava",
    "phone_number": "0e147bef00fdad1d29a28336b47f5398",
    "email": "5a164a60bc5065ee0d4e88341984f481a47e49da65bf37c54c585e2cf3e982a4",
    "subscription_price": 1800,
    "subscription_number": 13
  }
]

export function seedStudents() {
  for (const student of studentsData) {

    // Decrypt phone number and email
    const decryptedPhoneNumber = decrypt(student.phone_number);
    const decryptedEmail = student.email ? decrypt(student.email) : undefined;

    // Create a new student object with decrypted data
    const studentToInsert = {
      ...student,
      phone_number: decryptedPhoneNumber,
      email: decryptedEmail,
    };


    // Insert the student data into the database
    connection.query('INSERT IGNORE INTO students SET ?', studentToInsert, (err) => {
      if (err) {
        console.error('Error inserting student:', err);
      }
    });
  }
}

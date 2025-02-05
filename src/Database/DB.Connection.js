import {Sequelize} from "sequelize"


//   MS SQL

// Database connection settings
// export const sequelize = new Sequelize("HP_Update", "myproject", "NewStrongPassword", {
//     host: "localhost",       // Change if using a remote server
//     dialect: "mssql",        // Use Microsoft SQL Server
//     port: 1433,              // Default SQL Server port
//     logging: false,          // Disable logging SQL queries
//     dialectOptions: {
//         encrypt: false,       // Disable encryption if not using SSL
//         trustServerCertificate: true
//     }
// });



//  MY SQL
export const sequelize = new Sequelize("NFC" ,'root','', {
    host:'localhost' ,       
    dialect: "mysql",        
});


export const DBConnection = async()=>{
    await  sequelize.authenticate().then(()=>{
     console.log("Database Connected Successfully");
    }).catch((err)=>{
     console.error("Connection is Failed" , err)
    })
 }
 
 
 export const syncDBConnection = async()=>{
     await  sequelize.sync({alter:false,force:false}).then(()=>{
      console.log("Database Connected Sync Successfully");
     }).catch((err)=>{
      console.error("Connection Sync is Failed" , err)
     })
  }



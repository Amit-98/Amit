const _db_connect = require("../db/db-connect");
const async = require('async');
//const connect = _db_connect();
let Selectquery = (_selectquery, callback) => {
  sql.query(_selectquery, (error, results, fields) => {
    //console.log("RESULT:",results);
      if (error)
      {
        return callback(error);
      }
      if (results.length > 0) 
      {
        return callback(null, results);
      }
      if (results != "") 
      {
        return  callback(null, results);
      } 
      else 
      {
        return  callback(null, null);
      }
  });
};

let InsertQuery = (_insertQuery, cb) => {
  sql.query(_insertQuery, (error, results, fields) => {
      if (error)
      {
        return cb(error);
      } 
      if (results!= null) 
      {
        return cb(null, results);
      }
      else 
      {
        return cb(null, null);
      }
  });
};

let Updatequery = (_updatequery, cb) => {
  //sql.beginTransaction()
  sql.query(_updatequery, (error, results, fields) =>{
      if (error)
      {
        return cb(error);
      }
      if (results.length > 0) 
      {
        cb(null, results);
      }
      else 
        cb(null, results);
});
};

let Deletequery = (_deletequery, cb) => {
  sql.query(_deletequery, (error, results, fields) => {
      if (error) 
      {
        return cb(error);
      }
      if (results.length > 0)
      {
        cb(null,results);
      } 
      if (results != null)
      {
        cb(null,results);
      } 
      else
      {
        cb(null, null);
      } 
  });
};

let Transaction_query = (_query, cb) => {
  
  sql.beginTransaction(function(err)
  {
    if(err)
    {
      return cb(err);
    }

    sql.query(_query,function(err, result)
    {
      if(err)
      {
        sql.rollback(function()
        {
          //console.log("call",err);
          console.log("ROllback!");
          return cb(err);
        })
      }

      if(result!=null && result!="")
      {
        sql.commit(function(err)
        {
          if(err)
          {
            sql.rollback(function()
            {
              console.log("ROllback!");
              return cb(err);
            });
          }
          else
          {
            return cb(null, result);
          }
        })
      }

      sql.commit(function(err) 
      {
        if (err) 
        {
          sql.rollback(function()
          {
            console.log("Rollback!");
            return cb(err);
          });
        }
      });
    })
  })
}

let InsertQueryErrorLog = (_insertQuery) => {
  sql.query(_insertQuery, (error, results, fields) => {
      if (error)
      {
       
      } 
      if (results!= null) 
      {
       
      }
      else 
      {
        
      }
  });
};


module.exports = {
  Selectquery,
  InsertQuery,
  Updatequery,
  Deletequery,
  InsertQueryErrorLog,
  Transaction_query
};

let express =require('express')
let app=express();
let bodyParser = require('body-parser')
let mysql=require("mysql")
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

let server = require('http').createServer(app);
let options ={
    host:'localhost',
    port:'3306',//可选，默认就是3306
    user:'root',
    password:'19991008',
    database:'test'
}
//创建连接
let con =mysql.createConnection(options);
//建立连接
con.connect((err)=>{
    //如果连接失败
    if(err){
        console.log(err,"连接失败")
    } else{
        console.log("数据库连接成功")
    }
})
//获取token
app.get('/login',(req,res)=>{
    let token=new Date().getTime()
    //不允许发送数字
    res.send(token.toString())
})
//验证账号密码
app.post('/login',(req,res)=>{
    con.query('select * from loginperson',(error, results) =>{
        if (error) throw error;
        results.map((i)=>{
            if(i.username===`${req.body.username}`&& i.password===`${req.body.password}`){
                let obj= {
                    CO:'pass',
                    id_person:i.id_person
                }
                res.send(obj)
            }
        })
        res.send()
    });

})
//注册
app.post('/register',(req,res)=>{
    con.query(`insert into loginperson (username,password,status,id_person) values ('${req.body.username}','${req.body.password}','${req.body.status}','${new Date().getTime()}')`,(error, results) =>{
        if (error) throw error;
        // console.log("aaa",results);
        res.send(results);

    });

})
//获取name
app.post('/searchId',(req,res)=>{
    con.query('select * from loginperson',(error, results) =>{
        if (error) throw error;
        res.send(results);
      });
})
//获取课程
app.post('/getCourse',(req,res)=>{
    con.query('select * from course',(error, results) =>{
        if (error) throw error;
        res.send(results);
    });
})
//新增课程
app.post('/addCourse',(req,res)=>{
    con.query(`insert into course (courseid,date,teacher,time,study,type,address,material) values ('${new Date().getTime()}',
    '${req.body.date}','${req.body.teacher}','${req.body.time}',
    '${req.body.study}','${req.body.type}','${req.body.address}','${req.body.material}')`,(error, results) =>{
        if (error) throw error;
        res.send(results);
    });
})
//编辑课程
app.post('/editCourse',(req,res)=>{
    con.query(`update course set date='${req.body.date}',teacher='${req.body.teacher}',time='${req.body.time}',
    study='${req.body.study}',type='${req.body.type}',address='${req.body.address}',material='${req.body.material}' where courseid='${req.body.courseid}'`,(error,results)=>{
        if (error) throw error;

        res.send(results);
    })
})
//-------------------------------
//分页模块
//分页查询(课程)
app.post('/page',(req,res)=>{

    let pageNo = Number(req.body.page) || 1;
    let pageCount = Number(req.body.pageSize) || 10;
    let pageSize = pageCount;
    let page = (pageNo - 1) * pageCount;
    let sqlStr = `select * from course limit ${page},${pageSize}`;
    con.query(sqlStr,(error,results)=>{
        if(error){
            console.log(error);
            res.json({ err_code: 0, message: "获取分页数据失败"});
        }else{
            res.json({success_code: 200, message: '获取分页数据成功', data: results })
        }
    })
})
//----------------------------------------------------------
//模糊查询
app.post('/dimCourse',(req,res)=>{

    con.query(`SELECT * FROM course where teacher like '%${req.body.value}%'`,(error,result)=>{
        if(error){
            console.log("error!")
        }
        res.send(result)
    })
})
//获取作业表(包含模糊查询)
app.post('/getHomework',(req,res)=>{
    let searchSql=`SELECT * FROM homework where material like '%${req.body.value}%'`
    let Sql='SELECT * FROM homework'
    if(!req.body.value){
        con.query(Sql,(error,result)=>{
            if(error){
                console.log("error!")
            }
            res.send(result)
        })
    }else{
        con.query(searchSql,(error,result)=>{
            if(error){
                console.log("error!")
            }
            res.send(result)
        })
    }
})
//作业（分页）
app.post('/homepage',(req,res)=>{

    let pageNo = Number(req.body.page) || 1;
    let pageCount = Number(req.body.pageSize) || 10;
    let pageSize = pageCount;
    let page = (pageNo - 1) * pageCount;
    let sqlStr = `select * from homework limit ${page},${pageSize}`;
    con.query(sqlStr,(error,results)=>{
        if(error){
            console.log(error);
            res.json({ err_code: 0, message: "获取分页数据失败"});
        }else{
            res.json({success_code: 200, message: '获取分页数据成功', data: results })
        }
    })
})
//作业 提交
app.post('/submit',(req,res)=>{
    con.query(`update homework set status='1' where courseid='${req.body.courseid}'`,(error,results)=>{
        if (error) throw error;

        res.send(results);
    })
})
//作业发布
app.post('/addHome',(req,res)=>{
    con.query(`update course set video='1' where courseid='${req.body.courseid}'`,(error)=>{
        if(error){
            console.log("error!")
        }
    })
    con.query(`insert into homework (courseid,startTime,endTime,content,headman,status,material,date) values ('${req.body.courseid}',
    '${req.body.startTime}','${req.body.endTime}','${req.body.content}',
    '${req.body.headman}','0','${req.body.material}','${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}')`,(error, results) =>{
        if (error) throw error;
        res.send(results);
    });
})
//考核模块
//-------------------------------------------
//获取成绩表(降序)
app.post('/getReportCard',(req,res)=>{
    let Sql=`SELECT * FROM reportcard where name='${req.body.name}' order by grade desc`;
    con.query(Sql,(error,results)=>{
        if (error) throw error;
        res.send(results);
    })
})
//考核新增
app.post('/addChecK',(req,res)=>{
let sql=`insert into examine (name,title,date,teacher,status,status_answer) values ('${req.body.name}',
'${req.body.title}','${req.body.date}','${req.body.teacher}','0','0')`;
con.query(sql,(error,results)=>{
    if (error) throw error;
        res.send(results);
})
})
//考核编辑
app.post('/editCheck',(req,res)=>{
    con.query(`update examine set name='${req.body.name}',title='${req.body.title}',date='${req.body.date}',
    teacher='${req.body.teacher}',value='${req.body.value}' where id=${req.body.id}`,(error)=>{
        if (error) throw error;
    })
    if(`${req.body.value}`!==''&&`${req.body.value}`!=='undefined'){
        con.query(`update examine set status_answer='1' where id=${req.body.id}`,(error)=>{
            if (error) throw error;
        })
    }
    res.send()
})
app.post('/changeCheck',(req,res)=>{
    con.query(`update examine set status='1' where id=${req.body.id}`,(error,results)=>{
        if (error) throw error;
        res.send(results);
    })
})
//考核打分
app.post('/score',(req,res)=>{
    let sql=`insert into reportcard (name,grade,date) values ('${req.body.name}','${req.body.grade}','${req.body.date}')`;
    con.query(sql,(error,results)=>{
        if (error) throw error;
        res.send(results);
    })
})
//考核查询
app.post('/sCheck',(req,res)=>{
    let searchSql=`SELECT * FROM examine where teacher like '%${req.body.value}%'`
    let Sql='SELECT * FROM examine'
    if(!req.body.value){
        con.query(Sql,(error,result)=>{
            if(error){
                console.log("error!")
            }
            res.send(result)
        })
    }else{
        con.query(searchSql,(error,result)=>{
            if(error){
                console.log("error!")
            }
            res.send(result)
        })
    }
})
//考核（分页）
app.post('/checkpage',(req,res)=>{

    let pageNo = Number(req.body.page) || 1;
    let pageCount = Number(req.body.pageSize) || 10;
    let pageSize = pageCount;
    let page = (pageNo - 1) * pageCount;
    let sqlStr = `select * from examine limit ${page},${pageSize}`;
    con.query(sqlStr,(error,results)=>{
        if(error){
            console.log(error);
            res.json({ err_code: 0, message: "获取分页数据失败"});
        }else{
            res.json({success_code: 200, message: '获取分页数据成功', data: results })
        }
    })
})
server.listen(3000,()=>{
    console.log("server is running!")
})

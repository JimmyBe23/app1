from fastapi import FastAPI,APIRouter
import uvicorn
import os
import csv
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Data(BaseModel):
    Name:str
    LastName:str
    ItemSold:str
    Price:float
class Access(BaseModel):
    username:str
    password:str
login=[]
router=APIRouter()
class Router:
    # @router.post("/giveaccess")
    async def giveaccess(data:Access):
        path="./access_people.csv"
        if  not os.path.exists(path):
            with open(path,'w') as f:
                w=csv.writer(f)
                data=dict(data)
                print(data)
                w.writerow(["username","password"])
                w.writerow([hash(data["username"]),hash(data["password"])])  
                return True
        else:
            
            return False
        
            
    # @router.post("/login")
    def LogInPost(data:Access)   :
        path="./login.csv"
        
        with open(path,'w',newline="") as f:
            w=csv.writer(f)
            data=dict(data)
            print(data)
            w.writerow(["username","password"])
            w.writerow([hash(data["username"]),hash(data["password"])])  
        import pandas as pd
        df1=pd.read_csv(path)
        df2=pd.read_csv("./access_people.csv")
        data1=[df1["username"][0],df1["password"][0]]
        data2=[df2["username"][0],df2["password"][0]]
        login=[]
        login.append(data1[0]==data2[0] and data1[1]==data2[1])
        print(data1)
        print(data2)
        print(login)
        return (login[0])
            # if df==[]:
            #     os.remove(path)
            #     giveaccess(data)
    # @router.get("/data")
    def getData():
        path="./data.csv"
        import pandas as pd
        result=[]
        df=pd.read_csv(path)
        for i in range(len(df["Name"])):
            result.append({})
            for j in df.columns:    
                result[-1][j]=df[j][i]
        return result
    # @router.post("/data")
    async def giveaccess(data:Data):
        from datetime import datetime
        currentTime=datetime.now()
        day=str(currentTime).split(" ")[0]
        hour=currentTime.strftime("%H:%M:%S")
        path="./data.csv"
        if  not os.path.exists(path):
            with open(path,'a',newline="") as f:
                w=csv.writer(f)
                data=dict(data)
                print(data)
                w.writerow(["Date","Name","LastName","ItemSold","Price"])
                w.writerow([day+" "+hour,data["Name"],data["LastName"],data["ItemSold"],data["Price"]])  
        else:
            with open(path,'a',newline="") as f:
                w=csv.writer(f)
                data=dict(data)
                print(data)
                # w.writerow(["Date","Name","LastName","ItemSold","Price"])
                w.writerow([day+" "+hour,data["Name"],data["LastName"],data["ItemSold"],data["Price"]])  
    

   
    
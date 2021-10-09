import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme)=>({
  card:{
      height:"500px",
      display:"flex",
      flexDirection:"column",
  },
  cardMedia:{
      width:"170px",
      margin:"auto",
      height:"200px",
      cursor:"pointer"
  },
  cardTitle:{
    cursor:"pointer"
 },
  cartCardMedia:{
    height:"100px",
    margin:"auto",
    cursor:"pointer"
},
cartLength:{
  margin:"20px 5px"
},
cartTotal:{
  marginTop:"20px"
},
checkout:{
  [theme.breakpoints.down('sm')]: {
    marginTop:"20px"
  }
},
fullCard:{
  marginTop:"15px",
},
fullImage:{
  width:"90%",
  height:"600px",
  [theme.breakpoints.down('xs')]: {
    height:"300px",
  }
},
btn:{
  margin:"5px 20px"
},
fullTypography:{
  margin:"15px 10px",
  padding:"5px"
},
paddingBottom:{
  paddingBottom:"30px"
}
}))

export default useStyle;
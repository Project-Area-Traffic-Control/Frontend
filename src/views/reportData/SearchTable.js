import React from 'react';
import {
Container,
Grid,
makeStyles,
Paper
} from '@material-ui/core';
import Page from '../../components/Page';
// import VIsView from './VideoHistoryPage';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
// import {recordservice} from "../../services"
const useStyles = makeStyles((theme) => ({
root: {
backgroundColor: theme.palette.background.dark,
minHeight: '100%',
// paddingBottom: theme.spacing(3),
paddingTop: theme.spacing(3)
},
section1: {
margin: theme.spacing(3, 3),
},
margin: {
margin: theme.spacing(1),
},
button:{
margin: theme.spacing(1),
width:'300px'
},
avatar: {
margin: theme.spacing(1),
// backgroundColor: theme.palette.primary.main,

},
card:{
borderRadius:12,
backgroundColor: "#000000",
},
form: {
width: '100%', // Fix IE 11 issue.
},
textField :{
marginBottom: theme.spacing(1),
margin:theme.spacing(1)
},
paper: {
// margin: theme.spacing(2, 6),
margin: theme.spacing(2),
display: 'flex',
flexDirection: 'row',
alignItems: 'center',
},
pageTypography: {
    color: "#252733",
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: 'bold'
}
}));
const menuList = [
{
value: 'allCar',
label: 'ทั้งหมด',
},
{
value: 'blacklistCar',
label: 'ป้ายทะเบียน Blacklist',
},
{
value: 'whitelistCar',
label: 'ป้ายทะเบียน Whitelist',
}


];


const SearchTable = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [menu,setManu] = React.useState('mobileUsername') ;
    const [orders,setOrders] = React.useState([]);
    const [search ,setSearch] = React.useState({

        search:"",
        options:"mobileUsername",
        page:10,
        pageSize:10,
        timeRangeBegin:"",
        timeRangeEnd:""
    })

    const handleChangeManu = (event) => {
        setSearch({
        ...search,
        options:event.target.value
        })
        setManu(event.target.value);
    };

// React.useEffect(()=>{
// recordservice.getAllrecord(search).then((data)=>{
// console.log(data)
// setOrders(data.data)

// }).catch((e)=>{
// console.log(e)
// })
// },[])

    // function onsubmit() {
    //     recordservice.getAllrecord(search).then((data)=>{
    //     console.log(data)
    //     setOrders(data.data)

    //     }).catch((e)=>{
    //     console.log(e)
    //     })

    // }

return (
<Paper
className={classes.root}
> <div className={classes.section1}>
<Grid container alignItems="center">

<Grid item xs={12} >
<Typography gutterBottom variant="h3" className={classes.pageTypography}>
หน้ารายงาน
</Typography>
</Grid>
<Grid item xs={12} >
<Typography color="textSecondary" variant="body2">
To observe someone or something in a clandestine or furtive manner, so as not to be noticed doing so.
</Typography>
<br></br>
<br></br>
</Grid>
<Grid item xs={12} component={Card}
className={classes.card}
elevation={5} >
<div className={classes.paper}>
<Avatar className={classes.avatar}>
<SearchIcon color="primary"
variant="contained"
></SearchIcon>
</Avatar>
<Typography component="h1" variant="h5" className={classes.margin}>
Report Filter
</Typography>
<form className={classes.form} noValidate>
<TextField
className={classes.textField}
variant="outlined"
margin="normal"
required
onChange={(event)=>{
setSearch( {
...search,
search:event.target.value,
}) }}
id="search"
label="ค้นหาป้ายทะเบียน"
name="search"
value = {search.search}
autoFocus
/>
<TextField
className={classes.textField}
id="outlined-select-menu"
select
label="เลือกประเภท"
value={menu}
onChange={handleChangeManu}
helperText=""
variant="outlined"
>
{menuList.map((option) => (
<MenuItem key={option.value} value={option.value}>
{option.label}
</MenuItem>
))}
</TextField>
<TextField
id="datetime-local"
label="Date Range Start"
variant="outlined"
type="datetime-local"
color="primary"
onChange={(event)=>{
setSearch( {
...search,
timeRangeBegin:event.target.value,
}) }}
value={search.timeRangeBegin}
className={classes.textField}
InputLabelProps={{
shrink: true,
}}
/>
<TextField
id="datetime-local"
label="Date Range End"
variant="outlined"
type="datetime-local"
color="primary"
onChange={(event)=>{
setSearch( {
...search,
timeRangeEnd:event.target.value,
}) }}
value={search.timeRangeEnd}
className={classes.textField}
InputLabelProps={{
shrink: true,
}}
/>
<Button variant="contained" color="primary"

size="medium" className={classes.button}
onClick= {()=>{
onsubmit()
// navigate('/app/add_VI', { replace: true });
}}
>
Search
</Button>

</form>

</div>
</Grid>


{/* <Grid item>
<Button variant="contained" color="primary" size="medium" className={classes.margin}>
Edit Video
</Button>
</Grid>
<Grid item>
<Button variant="contained" color="secondary" size="medium" className={classes.margin}>
Remove Video
</Button>
</Grid> */}
</Grid>

</div>
{/* <Divider variant="middle" />
<Divider light={true}></Divider> */}
<Container maxWidth={false}>
<Grid
container
spacing={3}
>
<Grid
item
lg={12}
md={12}
xl={12}
xs={12}
>
{/* <VIsView orders={orders} /> */}
</Grid>
</Grid>
</Container>
</Paper>
);
};

export default SearchTable;
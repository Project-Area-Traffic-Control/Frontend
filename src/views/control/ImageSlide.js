import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { Grid, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    buttom: {
        display: 'flex',
        width: '100%'
    },
    leftBut: {
        display: 'flex',
        width: '50%',
        justifyContent: 'flex-start',
        // float: 'left'
    },
    rightBut: {
        display: 'flex',
        width: '50%',
        justifyContent: 'flex-end',
        // float: 'right'
    }
}));
const ImageSlide = (props) => {
    // const CollectionSize = MyCollection.length;
    useEffect(() => {
        console.log(props.overview)
    }, [])
    const image_path = props.overview
    const theme = useTheme();
    const [index, setActiveStep] = React.useState(0);
    const classes = useStyles();
    const MyCollection = [
        {
            label: "First Picture",
            imgPath:
                "https://media.geeksforgeeks.org/wp-content/uploads/20210208000010/1.png",
        },
        {
            label: "Second Picture",
            imgPath:
                "https://media.geeksforgeeks.org/wp-content/uploads/20210208000009/2.png",
        },
        {
            label: "Third Picture",
            imgPath:
                "https://media.geeksforgeeks.org/wp-content/uploads/20210208000008/3.png",
        },
    ];
    const goToNextPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <div
            style={{
                marginLeft: "40%",
            }}
        >
            <div
                style={{
                    maxWidth: 400,
                    flexGrow: 1,
                }}
            >
                <Paper
                    square
                    elevation={0}
                    style={{
                        height: 50,
                        display: "flex",
                        paddingLeft: theme.spacing(4),
                        backgroundColor: theme.palette.background.default,
                        alignItems: "center",
                    }}
                >
                    {/* <Typography>{MyCollection[index].label}</Typography> */}
                </Paper>
                {/* <img
                    src={image_path[index].url}
                    style={{
                        height: 255,
                        width: "100%",
                        maxWidth: 400,
                        display: "block",
                        overflow: "hidden",
                    }}
                /> */}
                <Grid
                    className={classes.buttom}
                >
                    <Grid
                        className={classes.leftBut}
                    >
                        <Button
                            size="small"
                            onClick={goToNextPicture}
                            disabled={index === MyCollection.length - 1}
                        >
                            <KeyboardArrowLeft />Previous
                        </Button>
                    </Grid>
                    <Grid
                        className={classes.rightBut}
                    >
                        <Button
                            size="small"
                            onClick={goToNextPicture}
                            disabled={index === MyCollection.length - 1}
                        >
                            Next<KeyboardArrowRight />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ImageSlide;
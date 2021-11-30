import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { withStyles } from "@material-ui/styles";
import { IconButton, makeStyles, styled } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import PropTypes from 'prop-types';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    dialogPaper: {
        minHeight: "80vh",
        maxHeight: "80vh",
    },
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    // '& .MuiDialogContent-root': {
    //     padding: theme.spacing(2),
    // },
    // '& .MuiDialogActions-root': {
    //     padding: theme.spacing(1),
    // },
    '& .MuiDialog-paper': {
        backgroundColor: '#FFFFFF'
    }
}));
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseOutlined />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
class AlertDialogSlide extends PureComponent {
    state = {
        // open: true,
        src: null,
        crop: {
            unit: "%",
            width: 30,
            aspect: 16 / 16
        }
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
            // reader.readAsBinaryString(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
            
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }

    render() {

        let fileInput = React.createRef();
        const { crop, croppedImageUrl, src } = this.state;
        return (
            <div>
                <Button
                    //   variant="outlined"
                    color="primary"
                    onClick={this.handleClickOpen}
                >
                    อัพโหลดรูปภาพ
                </Button>
                <BootstrapDialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.TransitionComponenthandleClose}
                >
                    <DialogTitle>{"เพิ่มรูปภาพ"}</DialogTitle>
                    <DialogContent>
                        <input
                            type="file"
                            ref={fileInput}
                            style={{ display: "none" }}
                            onChange={this.onSelectFile}
                            multiple
                        />

                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        )}
                        {croppedImageUrl && (
                            <img
                                alt="Crop"
                                style={{ maxWidth: "100%" }}
                                src={croppedImageUrl}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            ปิด
                        </Button>
                        <Button onClick={() => fileInput.current.click()}>
                            {src === null ? "อัพโหลดรูปภาพ" : "เปลี่ยนรูปภาพ"}
                        </Button>
                        {src !== null ? (
                            <Button onClick={() => console.log("Save Click handler"),
                                console.log(this.fileUrl)
                            }>
                                Save Photo
                            </Button>
                        ) : null}
                    </DialogActions>
                </BootstrapDialog>
            </div>
        );
    }
}

export default AlertDialogSlide;

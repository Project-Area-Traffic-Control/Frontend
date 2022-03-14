import L from "leaflet";

let latlng;
const onMoveOnMap = e => {
    latlng = e.latlng;
};

export default (mouseDownCallback, mouseUpCallback) =>
    L.Control.extend({
        options: {
            position: "topright"
        },
        onAdd: map => {
            const container = L.DomUtil.create(
                "div",
                "leaflet-bar leaflet-control leaflet-control-custom"
            );
            container.style.backgroundColor = "white";
            // container.style.backgroundImage =
            //   "url(https://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
            container.style.backgroundImage =
                "url(https://library.kissclipart.com/20181207/fie/kissclipart-logo-map-png-clipart-logo-5056a07220354980.jpg)";
            container.style.backgroundSize = "30px 30px";
            container.style.backgroundRepeat = "no-repeat";
            container.style.width = "30px";
            container.style.height = "30px";
            container.style.top = "80px";

            container.onmousedown = e => {
                e.stopPropagation();
                mouseDownCallback();
                const markerElement = L.DomUtil.create("div", "marker-element");
                markerElement.style.left = e.pageX + "px";
                markerElement.style.top = e.pageY + "px";
                document.body.appendChild(markerElement);
                document.onmousemove = moveEvent => {
                    moveEvent.preventDefault();
                    moveEvent.stopPropagation();
                    markerElement.style.left = moveEvent.pageX + "px";
                    markerElement.style.top = moveEvent.pageY + "px";
                };
                map.on("mousemove", onMoveOnMap);
                map.dragging.disable();
                document.onmouseup = upEvent => {
                    upEvent.preventDefault();
                    // upEvent.stopPropagation();
                    const removed = document.getElementsByClassName("marker-element")[0];
                    document.body.removeChild(removed);
                    document.onmouseover = null;
                    document.onmouseup = null;
                    map.off("mousemove", onMoveOnMap);
                    map.dragging.enable();
                    mouseUpCallback({ latlng });
                };
            };

            return container;
        }
    });

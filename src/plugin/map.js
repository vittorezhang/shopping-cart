var geolocation = new BMap.Geolocation();

export default  function () {
    let userLocationInfo;
     geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {

           userLocationInfo = {
                flag: true,
                point: { lng: r.point.lng, lat: r.point.lat }
            }
        }
        else {
          userLocationInfo={
                flag: false,
                point: { lng:116.483038, lat: 39.990633 }
            }
           
        }
        return userLocationInfo;
        
    }, { enableHighAccuracy: true })
}
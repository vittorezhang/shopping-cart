export default function (Api, data,paramobj) {
    var geolocation = new BMap.Geolocation();
    //用户定位信息
    let userLocationInfo = {
        flag: false,
        point: { lng: 116.483038, lat: 39.990633 }
    };
    geolocation.getCurrentPosition(
        function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                userLocationInfo = {
                    flag: true,
                    point: { lng: r.point.lng, lat: r.point.lat }

                };
                //请求位置
                Api.name({latitude:userLocationInfo.point.lat,longitude:userLocationInfo.point.lng,...paramobj}).then(res =>{
                    if (res.data.status == 0) Toast("获取位置失败,请检查");
                    data = res.data.name;
                })
                // storeListApi({latitude:userLocationInfo.point.lat,longitude:userLocationInfo.point.lng,...paramobj})
                // locationApi(userLocationInfo.point.lat + "," + userLocationInfo.point.lng).then(res => {
                //     if (res.data.status == 0) Toast("获取位置失败,请检查");

                //     that.userLoaction = res.data.name;
                // });
            } else {
                // locationApi(userLocationInfo.lat, userLocationInfo.lng);
            }
        },
        { enableHighAccuracy: true }
    );
}

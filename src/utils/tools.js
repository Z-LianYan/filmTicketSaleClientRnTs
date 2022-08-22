const AMap = window.AMap;
obj.geolocation = function ({onComplete, onError}) {
  // const AMap = window.AMap;
  // var map = new AMap.Map("map-container", {
  //   // viewMode: "3D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
  //   zoom: 11, //[23.01185,113.38798]
  // });
  AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 10000, //超过10秒后停止定位，默认：5s
      position: 'RB', //定位按钮的停靠位置
      buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
    });
    // map.addControl(geolocation);
    geolocation.getCurrentPosition(function (status, result) {
      if (status == 'complete') {
        onComplete && onComplete(result);
      } else {
        onError && onError(result);
      }
    });
  });
  //  释放地图
  // this.rmap && this.rmap.destory();
};

obj.getLocalCity = function ({onComplete, onError}) {
  var citysearch = new AMap.CitySearch();
  //自动获取用户IP，返回当前城市
  citysearch.getLocalCity(function (status, result) {
    if (status === 'complete' && result.info === 'OK') {
      if (result && result.city && result.adcode) {
        onComplete && onComplete(result);
      }
    } else {
      onError && onError(result);
    }
  });
};

obj.getQueryStringAll = function () {
  var url = window.location.search.substring(1);
  let valKey = url.split('&');
  let obj = {};
  for (var item of valKey) {
    let val_key = item.split('=');
    obj[val_key[0]] = val_key[1];
  }
  return obj;
};

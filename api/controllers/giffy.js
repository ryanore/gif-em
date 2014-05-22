var tmp = {
    "data": [
        {
            "bitly_fullscreen_url": "http://gph.is/XJIocS",
            "bitly_gif_url": "http://gph.is/XJIp0f",
            "bitly_tiled_url": "http://gph.is/XJIr8i",
            "id": "iU1NUdMq3sx3O",
            "images": {
                "fixed_height": {
                    "height": "200",
                    "url": "http://media0.giphy.com/media/iU1NUdMq3sx3O/200.gif",
                    "width": "267"
                },
                "fixed_height_downsampled": {
                    "height": "200",
                    "url": "http://media0.giphy.com/media/iU1NUdMq3sx3O/200_d.gif",
                    "width": "267"
                },
                "fixed_height_still": {
                    "height": "200",
                    "url": "http://media0.giphy.com/media/iU1NUdMq3sx3O/200_s.gif",
                    "width": "267"
                },
                "fixed_width": {
                    "height": "150",
                    "url": "http://media0.giphy.com/media/iU1NUdMq3sx3O/200w.gif",
                    "width": "200"
                },
                "fixed_width_downsampled": {
                    "height": "150",
                    "url": "http://media0.giphy.com/media/iU1NUdMq3sx3O/200w_d.gif",
                    "width": "200"
                },
                "fixed_width_still": {
                    "height": "150",
                    "url": "http://media0.giphy.com/media/iU1NUdMq3sx3O/200w_s.gif",
                    "width": "200"
                },
                "original": {
                    "frames": "3",
                    "height": "375",
                    "size": "189975",
                    "url": "http://media0.giphy.com/media/iU1NUdMq3sx3O/giphy.gif",
                    "width": "500"
                }
            },
            "type": "gif",
            "url": "http://giphy.com/gifs/iU1NUdMq3sx3O"
        }
    ],
    "meta": {
        "msg": "OK",
        "status": 200
    },
    "pagination": {
        "count": 1,
        "offset": "0",
        "total_count": 249
    }
};



exports.search = function(req, res) {

	res.json(tmp);
};

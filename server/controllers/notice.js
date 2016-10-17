function route(expressApp){

    expressApp.get('/notice', 'notice', expressApp.restrict, function (req, res) {
        expressApp.models.Notice.findAll().then(function(results) {
            res.render('notice/list', {
                title: 'Notices',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/notice/create', 'notice.create', expressApp.restrict, function (req, res) {

        res.render('notice/create', {
            title: 'Notices Create'
        });
    });

    expressApp.get('/notice/:id', 'notice.show', expressApp.restrict, function(req, res) {
        var NoticeID = req.params.id;
        expressApp.models.Notice.findOne({
            where: {
                NoticeID: NoticeID
            }
        })
        .then(function(result){
            res.render('notice/edit', {
                title: 'Notices',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/notice/', 'notice.store', expressApp.restrict, function(req, res, next) {
        var notice = req.body.notice;
        expressApp.models.Notice.create({
            NoticeID : notice.NoticeID

            , NoticeCategory1 : notice.NoticeCategory1
            , NoticeCategory2 : notice.NoticeCategory2
            , NoticeCategory3 : notice.NoticeCategory3

            , TargetGroup : notice.TargetGroup
            , TargetOS : notice.TargetOS
            , TargetDevice : notice.TargetDevice
            , NoticeImageLink : notice.NoticeImageLink
            , Title : notice.Title
            , Content : notice.Content

            , sCol1 : notice.sCol1 || ''
            , sCol2 : notice.sCol2 || ''
            , sCol3 : notice.sCol3 || ''
            , sCol4 : notice.sCol4 || ''
            , sCol5 : notice.sCol5 || ''
            , sCol6 : notice.sCol6 || ''
            , sCol7 : notice.sCol7 || ''
            , sCol8 : notice.sCol8 || ''
            , sCol9 : notice.sCol9 || ''
            , sCol10 : notice.sCol10 || ''

            , NoticeDurationFrom : notice.NoticeDurationFrom
            , NoticeDurationTo : notice.NoticeDurationTo
            , OrderNumber : notice.OrderNumber

            , CreateAdminID    : notice.CreateAdminID || ''
            , HideYN : notice.HideYN
            , DeleteYN : notice.DeleteYN
            , DataFromRegion : notice.DataFromRegion || ''
            , DataFromRegionDT : notice.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'
        }).then(function() {
            res.redirect('/notice');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/notice/edit', 'notice.update', expressApp.restrict, function(req, res) {
        res.redirect('/notice');
    });
}

module.exports = route;

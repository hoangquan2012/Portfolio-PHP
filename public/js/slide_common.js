include('/js/content_db.js');
include('/plugins/jszip/jszip.js');
include('/plugins/jszip-utils/jszip-utils.js');

var contentdb = null;

$(document).ready(function () {
    contentdb = new ContentDB('ContentCache');
    contentdb.open('FileContent');

    if (eldraw) {
        eldraw.util.loadAudio = function (url) {
            return new Promise(function (resolve) {
                contentdb.read(url).then(
                    function (result) {
                        var URL = window.URL || window.webkitURL;
                        var imgURL;
                        if (typeof result !== 'undefined' && result !== '') {
                            imgURL = URL.createObjectURL(result.content);
                            resolve(imgURL);
                        } else {
                            try {
                                var xhr = new XMLHttpRequest();
                                xhr.open('GET', url, true);
                                xhr.responseType = 'blob';
                                xhr.addEventListener(
                                    'load',
                                    function () {
                                        if (xhr.status === 200) {
                                            imgURL = URL.createObjectURL(xhr.response);
                                            resolve(imgURL);
                                            contentdb.add(url, xhr.response);
                                        } else {
                                            resolve(url);
                                        }
                                    },
                                    false
                                );
                                xhr.addEventListener('error', function () {
                                    resolve(url);
                                });
                                xhr.send();
                            } catch (e) {
                                resolve(url);
                            }
                        }
                    },
                    function (event) {
                        resolve(url);
                    }
                );
            });
        };

        eldraw.util.loadImageSrc = function (url) {
            return new Promise(function (resolve) {
                contentdb.read(url).then(
                    async function (result) {
                        if (typeof result !== 'undefined' && result !== '') {
                            resolve(result.content);
                        } else {
                            try {
                                let blob = await fetch(url).then((r) => r.blob());
                                var reader = new FileReader();
                                reader.onload = function (event) {
                                    resolve(event.target.result);
                                    contentdb.add(url, event.target.result);
                                };
                                reader.readAsDataURL(blob);
                            } catch (e) {
                                resolve(eldraw.sampleImage);
                            }
                        }
                    },
                    function (event) {
                        resolve(eldraw.sampleImage);
                    }
                );
            });
        };

        var setParentDirty = function (child) {
            if (child.group) {
                child.group.dirty = true;
                return setParentDirty(child.group);
            } else {
                return child;
            }
        };

        eldraw.useGifuctWorker = true;
        eldraw.gifuctDecoderWorkerUrl = '/assets/js/zyk/eldraw_gifuctworker.js';

        eldraw.Image.prototype._toSVG = function () {
            var svgString = [],
                imageMarkup = [],
                strokeSvg,
                x = -this.width / 2,
                y = -this.height / 2,
                clipPath = '';
            if (this.hasCrop()) {
                var clipPathId = eldraw.Object.__uid++;
                svgString.push('<clipPath id="imageCrop_' + clipPathId + '">\n', '\t<rect x="' + x + '" y="' + y + '" width="' + this.width + '" height="' + this.height + '" />\n', '</clipPath>\n');
                clipPath = ' clip-path="url(#imageCrop_' + clipPathId + ')" ';
            }
            imageMarkup.push(
                '\t<image ',
                'COMMON_PARTS',
                'xlink:href="',
                this.src,
                '" x="',
                x - this.cropX,
                '" y="',
                y - this.cropY,
                // we're essentially moving origin of transformation from top/left corner to the center of the shape
                // by wrapping it in container <g> element with actual transformation, then offsetting object to the top/left
                // so that object's center aligns with container's left/top
                '" width="',
                this.width,
                '" height="',
                this.height,
                '"',
                clipPath,
                '></image>\n'
            );

            if (this.stroke || this.strokeDashArray) {
                var origFill = this.fill;
                this.fill = null;
                strokeSvg = ['\t<rect ', 'x="', x, '" y="', y, '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '"/>\n'];
                this.fill = origFill;
            }
            if (this.paintFirst !== 'fill') {
                svgString = svgString.concat(strokeSvg, imageMarkup);
            } else {
                svgString = svgString.concat(imageMarkup, strokeSvg);
            }
            return svgString;
        };

        /**
         * Creates an instance of eldraw.Image from its object representation
         * @static
         * @param {Object} _object Object to create an instance from
         * @param {Function} callback Callback to invoke when an image instance is created
         */
        // eldraw.Image.fromObject = function (_object, callback) {
        //     var object = eldraw.util.object.clone(_object);

        //     var finalSrc;
        //     if (object.ignoreLoadImage && object.masterResourceCode) {
        //         finalSrc = object.src;
        //         var img = eldraw.util.createImage();
        //         img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYAACgAADAAAFAAHbiZPSAAAAAElFTkSuQmCC';

        //         eldraw.Image.prototype._initFilters.call(object, object.filters, function (filters) {
        //             object.filters = filters || [];
        //             eldraw.Image.prototype._initFilters.call(object, [object.resizeFilter], function (resizeFilters) {
        //                 object.resizeFilter = resizeFilters[0];
        //                 eldraw.util.enlivenObjects([object.clipPath], function (enlivedProps) {
        //                     object.clipPath = enlivedProps[0];
        //                     var image = new eldraw.Image(img, object);
        //                     image.src = finalSrc;

        //                     callback(image);
        //                 });
        //             });
        //         });
        //     } else {
        //         if (object.masterResourceCode) {
        //             finalSrc = object.src;
        //             object.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYAACgAADAAAFAAHbiZPSAAAAAElFTkSuQmCC';
        //         }
        //         eldraw.util.loadImage(
        //             object.src,
        //             function (img, error) {
        //                 if (error) {
        //                     callback && callback(null, error);
        //                     return;
        //                 }

        //                 eldraw.Image.prototype._initFilters.call(object, object.filters, function (filters) {
        //                     object.filters = filters || [];
        //                     eldraw.Image.prototype._initFilters.call(object, [object.resizeFilter], function (resizeFilters) {
        //                         object.resizeFilter = resizeFilters[0];
        //                         eldraw.util.enlivenObjects([object.clipPath], function (enlivedProps) {
        //                             object.clipPath = enlivedProps[0];
        //                             var image = new eldraw.Image(img, object);

        //                             if (finalSrc) {
        //                                 var newImage = new Image();
        //                                 newImage.onload = function () {
        //                                     image.setElement(newImage);
        //                                     image.dirty = true;
        //                                     image.setCoords();
        //                                     if (image.group) {
        //                                         image.group.dirty = true;
        //                                         var cv = setParentDirty(image.group).canvas;
        //                                         cv && cv.contextContainer && cv.requestRenderAll();
        //                                     } else {
        //                                         image.canvas && image.canvas.requestRenderAll();
        //                                     }
        //                                 };
        //                                 newImage.src = finalSrc;
        //                             }

        //                             callback(image);
        //                         });
        //                     });
        //                 });
        //             },
        //             null,
        //             object.crossOrigin
        //         );
        //     }
        // };
    }
});

var content_loaded = {};
function getContentFileJson(zipFileUrl, slide) {
    return new Promise((resolve, reject) => {
        if (typeof content_loaded[slide.JsonUrl] !== 'undefined') {
            resolve(content_loaded[slide.JsonUrl]);
        } else {
            if (typeof slide.JsonUrl === 'string' && slide.JsonUrl !== '') {
                let key_url = getKeySlideUrl(slide.JsonUrl);
                contentdb.read(key_url).then(
                    async function (result) {
                        if (typeof result !== 'undefined' && result !== '') {
                            content_loaded[slide.JsonUrl] = result.content;
                            resolve(result.content);
                        } else {
                            var content_json = await getContentZipFile(zipFileUrl, slide.JsonUrl);
                            if (content_json && content_json !== '') {
                                content_loaded[slide.JsonUrl] = content_json;
                                resolve(content_json);
                                contentdb.add(key_url, content_json);
                            } else {
                                var request = new XMLHttpRequest();
                                request.open('GET', await elApp.getFileUrl(slide.JsonUrl), true);
                                request.responseType = 'text';
                                request.onload = function () {
                                    content_loaded[slide.JsonUrl] = request.response;
                                    resolve(request.response);
                                    contentdb.add(key_url, request.response);
                                };
                                request.send();
                            }
                        }
                    },
                    function (event) {
                        content_loaded[slide.JsonUrl] = '{"version":"2.3.6","objects":[]}';
                        resolve('{"version":"2.3.6","objects":[]}');
                    }
                );
            } else {
                content_loaded[slide.JsonUrl] = '{"version":"2.3.6","objects":[]}';
                resolve('{"version":"2.3.6","objects":[]}');
            }
        }
    });
}

function getContentMasterJson(file_master) {
    return new Promise((resolve, reject) => {
        contentdb.read(file_master).then(
            async function (result) {
                if (typeof result !== 'undefined' && result !== '') {
                    resolve(result.content);
                } else {
                    var request = new XMLHttpRequest();
                    request.open('GET', await elApp.getFileUrl(file_master), true);
                    request.responseType = 'text';
                    request.onload = function () {
                        resolve(request.response);
                        contentdb.add(file_master, request.response);
                    };
                    request.send();
                }
            },
            function (event) {
                reject(event);
            }
        );
    });
}

function getKeySlideUrl(slideUrl) {
    let slideArr = slideUrl.split('/');
    return slideArr[slideArr.length - 1];
}

var zipFile = {};
function getContentZipFile(zipUrl, slideUrl) {
    let key_url = getKeySlideUrl(slideUrl);
    return new Promise((resolve, reject) => {
        if (typeof zipFile[zipUrl] !== 'undefined') {
            var prom = zipFile[zipUrl].file(key_url).async('string');
            prom.then(function (text) {
                resolve(text);
            });
        } else {
            let $modalLoading = $('#modalLoading');
            $modalLoading.modal('show');
            elApp.getFileUrl(zipUrl).then(function (fileUrl) {
                var request = new XMLHttpRequest();
                request.open('GET', fileUrl, true);
                request.responseType = 'blob';
                request.addEventListener('error', async function () {
                    $modalLoading.modal('hide');
                    var rq = new XMLHttpRequest();
                    rq.open('GET', await elApp.getFileUrl(slideUrl), true);
                    rq.responseType = 'text';
                    rq.onload = function () {
                        resolve(rq.response);
                    };
                    rq.send();
                });
                request.addEventListener(
                    'progress',
                    function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = parseInt((evt.loaded / evt.total) * 100);
                            $modalLoading.find('.alert-description span').text('(' + percentComplete + '%)');
                        }
                    },
                    false
                );
                request.onload = function () {
                    zipFile[zipUrl] = new JSZip();
                    zipFile[zipUrl].loadAsync(request.response, { binary: true }).then(function () {
                        if (zipFile[zipUrl].file(key_url)) {
                            var prom = zipFile[zipUrl].file(key_url).async('string');
                            prom.then(function (text) {
                                resolve(text);
                            });
                        } else {
                            resolve('');
                        }
                    });
                    $modalLoading.modal('hide');
                };
                request.send();
            });
        }
    });
}

function calcTotalSlideObject(canvas) {
    clearTimeout(canvas.timeoutCalcTotalObject);
    canvas.timeoutCalcTotalObject = setTimeout(function () {
        canvas.totalObjectIndex = canvas.getObjects().filter(function (item) {
            return !item.excludeFromExport;
        }).length;
    }, 500);
}

function loadBackgroundSlide(content, callback, event_state = false) {
    $('.canvas-container').find('.play-audio').remove();
    $('.canvas-container').find('.play-video').remove();
    var canvas = eldCustom.canvas;
    canvas.set({
        designMode: false
    });
    canvas.clear();

    try {
        $('body').block();
        canvas.off('firstTimeRendered');
        canvas.on('firstTimeRendered', function () {
            $('body').unblock();
        });
    } catch (e) {}

    canvas.loadFromJSON(
        JSON.parse(content),
        function () {
            // finish load object
            canvas.getObjects().forEach(function (object) {
                if (object.isAnimation) {
                    slideAnimations.forEach(function (animation) {
                        if (animation.ObjectId == object.ObjectId) {
                            animation.ObjectJson = JSON.stringify(object);
                            if (animation.Type === 0 && !animation.firstAction) {
                                object.isBGSlide = true;
                                canvas.remove(object);
                            }
                            if (!animation.firstAction) {
                                animation.firstAction = true;
                            }
                            return false;
                        }
                    });
                }
            });
            canvas.requestRenderAll();
            if (typeof live_params !== 'undefined') {
                live_params.currentSlideMaxIndex = canvas.getObjects().length;
            }
            callback();
        },
        function (o, object) {
            // object before add
            if (object) {
                object.objectLocked = true;
                object.isNotSend = true;
                object.isBGSlide = true;
                if (typeof playVideoStream !== 'undefined') {
                    if (object.videoId) {
                        if (object.videoUrl) {
                            clickPlayVideo(object);
                        }
                    } else {
                        if (object.videoUrl) {
                            clickPlayYoutube(object);
                        }
                    }
                }
                if (typeof playAudioStream !== 'undefined') {
                    if (object.audioUrl) {
                        clickPlayAudio(object);
                    }
                }
                object.scaleX = (object.scaleX * eldCustom.size) / canvas_size;
                object.scaleY = (object.scaleY * eldCustom.size) / canvas_size;
                object.left = (object.left * eldCustom.size) / canvas_size;
                object.top = (object.top * eldCustom.size) / canvas_size;

                object.setCoords();

                if (object.type === 'gifuct') {
                    object.loopAnimation = true;
                    if (typeof live_params !== 'undefined' && !live_params.isLearner) {
                        object.on('mousedblclick', function () {
                            if (object.isPlaying) {
                                object.stop();
                                if (typeof sendStopAnimationObject !== 'undefined') {
                                    sendStopAnimationObject(object.ObjectId);
                                }
                            } else {
                                object.play();
                                if (typeof sendPlayAnimationObject !== 'undefined') {
                                    sendPlayAnimationObject(object.ObjectId);
                                }
                            }
                        });
                    }
                }
            }
        },
        event_state
    );
}

var listObjectCache = null;
var listObjectCachePdf = null;

function saveObjectToCache(objects, slideId, is_pdf = false) {
    var key = groupLearningId;
    var listObject = listObjectCache;
    if (is_pdf) {
        key = 'pdf_' + groupLearningId;
        listObject = listObjectCachePdf;
    }
    if (typeof key !== 'string') {
        key = key.toString();
    }
    if (listObject[slideId]) {
        objects.forEach(function (obj) {
            listObject[slideId] = listObject[slideId].filter(function (elem) {
                return elem.ObjectId !== obj.ObjectId;
            });
        });
        objects.forEach(function (obj) {
            listObject[slideId].push(obj);
        });
    } else {
        listObject[slideId] = objects;
    }
    modifyObjectDb.put(key, JSON.stringify(listObject));
    if (is_pdf) {
        listObjectCachePdf = listObject;
    } else {
        listObjectCache = listObject;
    }
}
function removeObjectFromCache(objects, slideId, is_pdf = false) {
    var key = groupLearningId;
    var listObject = listObjectCache;
    if (is_pdf) {
        key = 'pdf_' + groupLearningId;
        listObject = listObjectCachePdf;
    }
    if (typeof key !== 'string') {
        key = key.toString();
    }
    if (listObject[slideId]) {
        objects.forEach(function (item) {
            listObject[slideId] = listObject[slideId].filter(function (elem) {
                return elem.ObjectId !== item.ObjectId;
            });
        });
        modifyObjectDb.put(key, JSON.stringify(listObject));
    }
    if (is_pdf) {
        listObjectCachePdf = listObject;
    } else {
        listObjectCache = listObject;
    }
}

function mergeModifyObjectFromCache(data, listObj, callback, is_pdf = false) {
    var key = groupLearningId;
    if (is_pdf) {
        key = 'pdf_' + groupLearningId;
    }
    if (typeof key !== 'string') {
        key = key.toString();
    }
    modifyObjectDb.read(key).then(
        function (result) {
            try {
                if (typeof result != 'undefined' && result != '') {
                    var objectCached = JSON.parse(result.content);
                    // remove object in cache

                    let allObjectIds = [];
                    data.IndexObjects.forEach(function (indexObject) {
                        allObjectIds.push(indexObject.ObjectId);
                    });

                    $.each(objectCached, function (slideId, items) {
                        objectCached[slideId] = items.filter(function (elem) {
                            return allObjectIds.indexOf(elem.ObjectId) >= 0;
                        });
                    });

                    data.DeletedObjects.forEach(function (item2) {
                        $.each(objectCached, function (slideId, items) {
                            objectCached[slideId] = items.filter(function (elem) {
                                return elem.ObjectId !== item2;
                            });
                        });
                    });

                    // merge list object
                    $.each(listObj, function (slideId, items) {
                        if (objectCached[slideId]) {
                            var cacheItems = objectCached[slideId];

                            items.forEach(function (item) {
                                cacheItems = cacheItems.filter(function (elem) {
                                    return elem.ObjectId !== item.ObjectId;
                                });
                            });
                            items.forEach(function (item) {
                                cacheItems.push(item);
                            });
                            objectCached[slideId] = cacheItems;
                        } else {
                            objectCached[slideId] = items;
                        }
                    });
                    listObj = objectCached;

                    // add index to list object
                    $.each(listObj, function (slideId, items) {
                        items.forEach(function (item) {
                            data.IndexObjects.forEach(function (indexObject) {
                                if (indexObject.ObjectId == item.ObjectId) {
                                    item.indexObject = indexObject.Index;
                                }
                            });
                        });
                    });

                    $.each(listObj, function (slideId, items) {
                        items.sort(function (a, b) {
                            return a.indexObject - b.indexObject;
                        });
                    });
                    modifyObjectDb.put(key, JSON.stringify(listObj));
                } else {
                    modifyObjectDb.add(key, JSON.stringify(listObj));
                }
                if (is_pdf) {
                    listObjectCachePdf = listObj;
                } else {
                    listObjectCache = listObj;
                }
                callback(listObj);
            } catch (e) {
                callback(listObj);
            }
        },
        function (event) {
            callback(listObj);
        }
    );
}

var listIndexObject = {};
function getIndexObject() {
    let slideActive = getSlideActive();
    let canvas = eldCustom.canvas;
    let listIndex = [];
    canvas.getObjects().forEach(function (obj) {
        if (obj.ObjectId && obj.ObjectId !== 'bgSlide') {
            listIndex.push({ ObjectId: obj.ObjectId, Index: canvas.getObjects().indexOf(obj) });
        }
    });
    listIndexObject[slideActive] = listIndex;
    if (eldCustom.canvas.currentViewState === VIEW_REVIEW_EXERCISE) {
        slideActive = getSlideActive(eldCustom.canvas2);
        canvas = eldCustom.canvas2;
        listIndex = [];
        canvas.getObjects().forEach(function (obj) {
            if (obj.ObjectId && obj.ObjectId !== 'bgSlide') {
                listIndex.push({ ObjectId: obj.ObjectId, Index: canvas.getObjects().indexOf(obj) });
            }
        });
        listIndexObject[slideActive] = listIndex;

        slideActive = getSlideActive(eldCustom.canvas3);
        canvas = eldCustom.canvas3;
        listIndex = [];
        canvas.getObjects().forEach(function (obj) {
            if (obj.ObjectId && obj.ObjectId !== 'bgSlide') {
                listIndex.push({ ObjectId: obj.ObjectId, Index: canvas.getObjects().indexOf(obj) });
            }
        });
        listIndexObject[slideActive] = listIndex;
    }
}

function unlockObjectDrag(email) {
    let canvas = eldCustom.canvas;
    if (typeof learner_email !== 'undefined' && email === learner_email) {
        canvas.discardActiveDraggingObject();
    } else {
        canvas.getObjects().forEach(function (obj) {
            if (obj.locked && obj.lockedBy === email) {
                canvas.unlockObject(obj, true);
                delete obj.lockedBy;
                canvas.requestRenderAll();
            }
        });
    }
}

function sortListObject(objects, slideActive) {
    if (typeof objects === 'undefined') {
        return objects;
    }
    if (typeof listIndexObject[slideActive] !== 'undefined') {
        objects.forEach(function (item) {
            listIndexObject[slideActive].forEach(function (indexObject) {
                if (indexObject.ObjectId === item.ObjectId) {
                    item.indexObject = indexObject.Index;
                }
            });
        });
        objects.sort(function (a, b) {
            return a.indexObject - b.indexObject;
        });
    }
    return objects;
}

function getObjectFromLog(slideActive = false) {
    if (!slideActive) {
        slideActive = getSlideActive();
    }
    var listObj = undo[slideActive];
    var objectAdd = [];
    if (typeof listObj !== 'undefined') {
        $.each(listObj, function (i, state) {
            if (state['type'] === 'modified') {
                let objs = JSON.parse(state.objects);
                $.each(objs, function (k, temp) {
                    objectAdd.forEach(function (item, index, theArray) {
                        if (item.ObjectId === temp.ObjectId) {
                            theArray[index] = temp;
                        }
                    });
                });
            } else if (state['type'] === 'added') {
                let objs = JSON.parse(state.objects);
                $.each(objs, function (k, temp) {
                    var hasObject = false;
                    objectAdd.forEach(function (item, index, theArray) {
                        if (item.ObjectId === temp.ObjectId) {
                            theArray[index] = temp;
                            hasObject = true;
                        }
                    });
                    if (!hasObject) {
                        objectAdd.push(temp);
                    }
                });
            } else if (state['type'] === 'removed') {
                let objs = JSON.parse(state.objects);
                $.each(objs, function (k, temp) {
                    objectAdd = objectAdd.filter(function (elem) {
                        return elem.ObjectId !== temp.ObjectId;
                    });
                });
            }
        });
    }
    objectAdd = sortListObject(objectAdd, slideActive);
    objectAdd.forEach(function (obj) {
        delete obj.indexObject;
    });

    return objectAdd;
}

function preloadContent(list_pdf) {
    let content_cache_loaded = [];
    if (localStorage.getItem('content_cache_loaded') != null) {
        content_cache_loaded = localStorage.getItem('content_cache_loaded').split(',');
    }
    if (list_pdf.Files.length > 0) {
        list_pdf.Files.forEach(function (file) {
            if ($.inArray(file.Id.toString(), content_cache_loaded) < 0) {
                switch (file.LibraryType) {
                    case 3:
                        if (file.ConvertType == 1) {
                            preloadContentPPTX(file);
                        } else if (file.ConvertType == 0) {
                            preloadContentPDF(file);
                        }
                        break;
                    case 6:
                        preloadContentSlide(file);
                        break;
                    case 7:
                        preloadContentExercise(file);
                        break;
                }
            } else {
                if (typeof content_downloading[file.Id] === 'undefined') {
                    content_downloading[file.Id] = { status: false };
                }
                if (!content_downloading[file.Id].showUI) {
                    $('#pdfOpenProgress').hide();
                }
                content_downloading[file.Id].status = true;
            }
        });
    }
}

var content_downloading = {};
function preloadContentPDF(file) {
    if (typeof content_downloading[file.Id] === 'undefined') {
        content_downloading[file.Id] = { status: false };
    }
    contentdb.read(file.FileUrl).then(
        async function (result) {
            if (typeof result === 'undefined') {
                var request = new XMLHttpRequest();
                request.open('GET', await elApp.getFileUrl(file.FileUrl), true);
                request.responseType = 'blob';
                request.addEventListener(
                    'progress',
                    function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = parseInt((evt.loaded / evt.total) * 100);
                            if (content_downloading[file.Id].showUI) {
                                $('#pdfOpenProgress')
                                    .find('#loadingProgress')
                                    .text('(' + percentComplete + '%)');
                            }
                        }
                    },
                    false
                );
                request.onload = function () {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var contentPdf = e.target.result;
                        contentdb.add(file.FileUrl, contentPdf);
                        content_downloading[file.Id].status = true;
                        if (content_downloading[file.Id].showUI) {
                            $('#pdfOpenProgress').find('#startOpenPdf').show();
                        }
                        addCacheLoadedId(file.Id);
                    };
                    reader.readAsDataURL(request.response);
                };
                request.send();
            } else {
                if (!content_downloading[file.Id].showUI) {
                    $('#pdfOpenProgress').hide();
                }
                addCacheLoadedId(file.Id);
            }
        },
        function (event) {}
    );
}

async function preloadContentPPTX(file) {
    if (typeof content_downloading[file.Id] === 'undefined') {
        content_downloading[file.Id] = { status: false };
    }
    JSZipUtils.getBinaryContent(await elApp.getFileUrl(file.FileUrl), function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let zipFile = new JSZip();
            zipFile.loadAsync(data).then(function () {
                zipFile.forEach(async function (path, content) {
                    let key_url = file.Id + '_' + path;
                    contentdb.read(key_url).then(
                        function (result) {
                            if (typeof result === 'undefined') {
                                content.async('base64').then(function (base64) {
                                    contentdb.add(key_url, base64);
                                });
                            }
                        },
                        function (event) {}
                    );
                });

                setTimeout(function () {
                    addCacheLoadedId(file.Id);
                }, 100);
            });
        }
    });
}

function preloadContentSlide(file) {
    var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
        url: '/anonymous/getSlideZip',
        type: 'POST',
        dataType: 'json',
        data: {
            _token: CSRF_TOKEN,
            libraryId: file.LibraryId
        },
        success: async function (result) {
            if (result.Approved) {
                JSZipUtils.getBinaryContent(await elApp.getFileUrl(result.JsonUrl), function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        let zipFile = new JSZip();
                        zipFile.loadAsync(data).then(function () {
                            zipFile.forEach(async function (path, content) {
                                let key_url = path;

                                contentdb.read(key_url).then(
                                    function (result) {
                                        if (typeof result === 'undefined') {
                                            content.async('string').then(function (json) {
                                                contentdb.add(key_url, json);
                                            });
                                        }
                                    },
                                    function (event) {}
                                );
                            });

                            addCacheLoadedId(file.Id);
                        });
                    }
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown + '____' + jqXHR);
            $('body').unblock();
        }
    });
}

function preloadContentExercise(file) {
    var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
        url: '/anonymous/getExerciseFile',
        type: 'POST',
        dataType: 'json',
        data: {
            _token: CSRF_TOKEN,
            libraryId: file.LibraryId
        },
        success: async function (result) {
            if (result.Approved) {
                JSZipUtils.getBinaryContent(await elApp.getFileUrl(result.JsonUrl), function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        let zipFile = new JSZip();
                        zipFile.loadAsync(data).then(function () {
                            zipFile.forEach(async function (path, content) {
                                let key_url = path;

                                contentdb.read(key_url).then(
                                    function (result) {
                                        if (typeof result === 'undefined') {
                                            content.async('string').then(function (json) {
                                                contentdb.add(key_url, json);
                                            });
                                        }
                                    },
                                    function (event) {}
                                );
                            });

                            addCacheLoadedId(file.Id);
                        });
                    }
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown + '____' + jqXHR);
            $('body').unblock();
        }
    });
}

function addCacheLoadedId(id) {
    if (typeof content_downloading[id] === 'undefined') {
        content_downloading[id] = { status: false };
    }
    content_downloading[id].status = true;

    let content_cache_loaded = [];
    if (localStorage.getItem('content_cache_loaded') != null) {
        content_cache_loaded = localStorage.getItem('content_cache_loaded').split(',');
    }
    content_cache_loaded = content_cache_loaded.filter(function (item) {
        return item !== id.toString();
    });
    content_cache_loaded.push(id.toString());
    localStorage.setItem('content_cache_loaded', content_cache_loaded.join(','));
}

function exportDiffCanvasJson(oldJson, newJson) {
    if (typeof oldJson === 'string') {
        oldJson = JSON.parse(oldJson);
    }
    if (typeof newJson === 'string') {
        newJson = JSON.parse(newJson);
    }
    let result = [];
    let ignoreProps = ['selectable'];
    newJson.objects.forEach(function (object, index) {
        let oObject = oldJson.objects.find(function (obj) {
            return obj.ObjectId === object.ObjectId;
        });
        if (!oObject) {
            result.push(object);
        } else {
            result[index] = exportDiffObject(oObject, object);
            result[index] = { ObjectId: object.ObjectId };
        }
    });

    return result;
}

function mergeDiffCanvasJson(json_canvas, diff_objects) {
    if (typeof json_canvas === 'string') {
        json_canvas = JSON.parse(json_canvas);
    }
    if (typeof diff_objects === 'string') {
        diff_objects = JSON.parse(diff_objects);
    }

    let newObjects = [];
    diff_objects.forEach(function (diff) {
        let object = json_canvas.objects.find(function (obj) {
            return obj.ObjectId === diff.ObjectId;
        });
        if (object) {
            newObjects.push(mergeDiffObject(object, diff));
        } else {
            newObjects.push(diff);
        }
    });
    json_canvas.objects = newObjects;

    return json_canvas;
}

function exportDiffObject(oldObject, newObject) {
    let result = {};
    let ignoreProps = ['selectable'];
    Object.keys(newObject).forEach((key) => {
        if (ignoreProps.indexOf(key) < 0 && (typeof oldObject[key] === 'undefined' || JSON.stringify(oldObject[key]) !== JSON.stringify(newObject[key]))) {
            result[key] = JSON.parse(JSON.stringify(newObject[key]));
        }
    });

    return result;
}

function mergeDiffObject(object, diff) {
    if (typeof diff === 'string') {
        diff = JSON.parse(diff);
    }
    for (let key in diff) {
        object[key] = JSON.parse(diff[key]);
    }
    return object;
}

var canvasThumb;
function getSlideThumbnailImage(slide_master, canvas_json, size = 166, mimeType = 'image/webp') {
    return new Promise(async (resolve, reject) => {
        if (!canvasThumb) {
            canvasThumb = new eldraw.Canvas();
            canvasThumb.set({
                designMode: false,
                renderOnAddRemove: false
            });
            if (typeof slide_master === 'string') {
                slide_master = JSON.parse(slide_master);
            }
            // console.log(slide_master);
            canvasThumb._slideMaster = await new Promise((resolve) => {
                eldraw.SlideMaster.fromObject(
                    slide_master,
                    function (sm) {
                        resolve(sm);
                    },
                    true,
                    true
                );
            });

            canvasThumb._slideMaster.globalAudioVolume = 0;
        }

        let scale = size / canvas_size;

        canvasThumb.stopAllBackgroundAudio();
        canvasThumb.clear();

        canvasThumb.setWidth(size);
        canvasThumb.setHeight(getCanvasHeight(size));

        canvasThumb.canvasScale = scale;

        canvasThumb.loadFromJSON(
            canvas_json,
            function () {
                setTimeout(function () {
                    resolve(canvasThumb.lowerCanvasEl.toDataURL(mimeType));
                    canvasThumb.stopAllBackgroundAudio();
                    canvasThumb.clear();
                }, 500);
            },
            function (o, object) {
                object.scaleX = object.scaleX * scale;
                object.scaleY = object.scaleY * scale;
                object.left = object.left * scale;
                object.top = object.top * scale;
                object.setCoords();
            }
        );
    });
}

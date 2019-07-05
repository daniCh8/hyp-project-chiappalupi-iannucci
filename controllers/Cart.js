'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.getCart = function getCart(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json, 401)
    } else {
        return Cart.checkSession(req.session.id).then(function(response) {
            console.log("response")
            console.log(response)
            if (response.length == 0) {
                var json = {
                    "success": false,
                    "errorMessage": "You are not logged in."
                }
                req.session.loggedin = false
                utils.writeJson(res, json, 401)
            } else {
                console.log("here")
                return Cart.getCart(req).then(function(response) {
                        console.log("1response")
                        console.log(response)
                        utils.writeJson(res, response, 200);
                    })
                    .catch(function(response) {
                        utils.writeJson(res, response);
                    });
            }
        })
    }
};

module.exports.addOrder = function addOrder(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json, 401)
    } else {
        var ISBN = req.swagger.params['ISBN'].value;
        var quantity = req.swagger.params['quantity'].value;
        var body = {
            "ISBN": ISBN,
            "quantity": quantity
        }
        var id = req.session.id
        Cart.checkSession(id).then(function(response) {
            if (response.length == 0) {
                var json = {
                    "success": false,
                    "errorMessage": "You are not logged in."
                }
                req.session.loggedin = false
                utils.writeJson(res, json, 401)
            } else {
                Cart.checkISBNInCart(body.ISBN, id).then(function(check) {
                    var json = {
                        "success": true
                    }
                    if (check.length > 0) {
                        var newQuantity = body.quantity + check[0].quantity
                        Cart.updateQuantity(body.ISBN, newQuantity, id).then(function(response) {
                                utils.writeJson(res, json, 200);
                            })
                            .catch(function(response) {
                                utils.writeJson(res, json);
                            });
                        return;
                    }
                    Cart.addOrder(body, id).then(function(response) {
                            utils.writeJson(res, json, 200);
                        })
                        .catch(function(response) {
                            utils.writeJson(res, json);
                        });
                })
            }
        })
    }
};

module.exports.deleteOrder = function deleteOrder(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json, 401)
    } else {
        var ISBN = req.swagger.params['ISBN'].value;
        var id = req.session.id
        Cart.checkSession(req.session.id).then(function(response) {
            if (response.length == 0) {
                var json = {
                    "success": false,
                    "errorMessage": "You are not logged in."
                }
                req.session.loggedin = false
                utils.writeJson(res, json, 401)
            } else {
                Cart.checkISBNInCart(ISBN, id).then(function(check) {
                    if (check.length == 0) {
                        json = {
                            "success": false,
                            "errorMessage": "There isn't any book whith this ISBN in your cart."
                        }
                        utils.writeJson(res, json, 404);
                        return;
                    }
                    Cart.deleteOrder(ISBN, id).then(function(response) {
                            var json = {
                                "success": true
                            }
                            utils.writeJson(res, json, 200);
                        })
                        .catch(function(response) {
                            utils.writeJson(res, json);
                        });
                })
            }
        })
    }
};

module.exports.clearCart = function clearCart(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json, 401)
    } else {
        var id = req.session.id
        Cart.checkSession(id).then(function(response) {
            if (response.length == 0) {
                var json = {
                    "success": false,
                    "errorMessage": "You are not logged in."
                }
                req.session.loggedin = false
                utils.writeJson(res, json, 401)
            } else {
                Cart.clearCart(id).then(function(response) {
                        var json = {
                            "success": true
                        }
                        utils.writeJson(res, json, 200);
                    })
                    .catch(function(response) {
                        utils.writeJson(res, json);
                    });
            }
        })
    }
};

module.exports.updateBookQuantity = function updateBookQuantity(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json, 401)
    } else {
        var ISBN = req.swagger.params['ISBN'].value;
        var newQuantity = req.swagger.params['quantity'].value;
        var id = req.session.id
        Cart.checkSession(req.session.id).then(function(response) {
            if (response.length == 0) {
                var json = {
                    "success": false,
                    "errorMessage": "You are not logged in."
                }
                req.session.loggedin = false
                utils.writeJson(res, json, 401)
            } else {
                Cart.checkISBNInCart(ISBN, id).then(function(check) {
                    if (check.length == 0) {
                        json = {
                            "success": false,
                            "errorMessage": "There isn't any book whith this ISBN in your cart."
                        }
                        utils.writeJson(res, json, 404);
                        return;
                    }
                    Cart.updateQuantity(ISBN, newQuantity, id).then(function(response) {
                            var json = {
                                "success": true
                            }
                            utils.writeJson(res, json, 200);
                        })
                        .catch(function(response) {
                            utils.writeJson(res, json);
                        });
                })
            }
        })
    }
};

module.exports.checkout = function checkout(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json, 401)
    } else {
        var id = req.session.id

        Cart.checkSession(req.session.id).then(function(response) {
            if (response.length == 0) {
                json = {
                    "success": false,
                    "errorMessage": "You are not logged in."
                }
                req.session.loggedin = false
                utils.writeJson(res, json, 401)
            } else {
                Cart.checkCart(id).then(function(check) {
                    if (check.length == 0) {
                        json = {
                            "success": false,
                            "errorMessage": "There isn't any book in your cart."
                        }
                        utils.writeJson(res, json, 404);
                        return;
                    }
                    Cart.checkout(id).then(function(response) {
                            var json = {
                                "success": true
                            }
                            utils.writeJson(res, json, 200);
                        })
                        .catch(function(response) {
                            utils.writeJson(res, json);
                        });
                })
            }
        })
    }
};
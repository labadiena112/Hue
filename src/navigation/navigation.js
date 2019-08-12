import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

export const goToBridgeConnectionNav = () => Navigation.setRoot({
    root: {
        component: {
            id: 'bridgeConnectionId',
            name: 'BridgeConnectionScreen',
            options: {
                statusBar: {
                    visible: true,
                    style: 'dark',
                    backgroundColor: 'transparent',
                    drawBehind: false
                },
                layout: {
                    orientation: ['portrait']
                },
                topBar: {
                    visible: true,
                    animate: true,
                    drawBehind: false,
                    title: {
                        text: 'Bridges'
                    },
                    largeTitle: {
                        visible: true
                    },
                    backButton: {
                        visible: false
                    }
                }
            }
        }
    }
});

export const newGroupScreen = () => {
    return {
        component: {
            id: 'newGroupId',
            name: 'NewGroupScreen',
            options: {
                statusBar: {
                    visible: true,
                    style: 'dark',
                    backgroundColor: 'transparent',
                    drawBehind: false
                },
                layout: {
                    orientation: ['portrait']
                },
                topBar: {
                    visible: true,
                    animate: true,
                    drawBehind: false,
                    title: {
                        text: 'Nauja grupe'
                    },
                    largeTitle: {
                        visible: true
                    },
                    backButton: {
                        visible: true
                    }
                }
            }
        }
    }
}

export const newSceneScreen = () => {
    return {
        component: {
            id: 'newSceneId',
            name: 'NewSceneScreen',
            options: {
                statusBar: {
                    visible: true,
                    style: 'dark',
                    backgroundColor: 'transparent',
                    drawBehind: false
                },
                layout: {
                    orientation: ['portrait']
                },
                topBar: {
                    visible: true,
                    animate: true,
                    drawBehind: false,
                    title: {
                        text: 'Nauja scena'
                    },
                    largeTitle: {
                        visible: true
                    },
                    backButton: {
                        visible: true
                    }
                }
            }
        }
    }
}

export const goToAppNav = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30)
    ]).then(sources => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    children: [
                        {
                            stack: {
                                children: [{
                                    component: {
                                        id: 'lightsId',
                                        name: 'NewSceneScreen'
                                    }
                                }],
                                options: {
                                    statusBar: {
                                        visible: true,
                                        style: 'dark',
                                        backgroundColor: 'transparent',
                                        drawBehind: false
                                    },
                                    layout: {
                                        orientation: ['portrait']
                                    },
                                    bottomTab: {
                                        text: 'Lemputes',
                                        selectedIconColor: 'red',
                                        icon: sources[0],
                                    },
                                    topBar: {
                                        visible: false,
                                        animate: false,
                                        drawBehind: true,
                                        title: {
                                            text: 'Lemputes'
                                        },
                                        largeTitle: {
                                            visible: true
                                        },
                                        backButton: {
                                            visible: true
                                        }
                                    }
                                }
                            }
                        },
                        {
                            stack: {
                                children: [{
                                    component: {
                                        id: 'groupsId',
                                        name: 'GroupsScreen'
                                    }
                                }],
                                options: {
                                    statusBar: {
                                        visible: true,
                                        style: 'dark',
                                        backgroundColor: 'transparent',
                                        drawBehind: false
                                    },
                                    layout: {
                                        orientation: ['portrait']
                                    },
                                    bottomTab: {
                                        text: 'Grupes',
                                        selectedIconColor: 'red',
                                        icon: sources[0],
                                    },
                                    topBar: {
                                        visible: false,
                                        animate: false,
                                        drawBehind: true,
                                        title: {
                                            text: 'Scenos'
                                        },
                                        largeTitle: {
                                            visible: true
                                        },
                                        backButton: {
                                            visible: true
                                        }
                                    }
                                }
                            }
                        },
                        {
                            stack: {
                                children: [{
                                    component: {
                                        id: 'scenesId',
                                        name: 'ScenesScreen'
                                    }
                                }],
                                options: {
                                    statusBar: {
                                        visible: true,
                                        style: 'dark',
                                        backgroundColor: 'transparent',
                                        drawBehind: false
                                    },
                                    layout: {
                                        orientation: ['portrait']
                                    },
                                    bottomTab: {
                                        text: 'Scenos',
                                        selectedIconColor: 'red',
                                        icon: sources[0],
                                    },
                                    topBar: {
                                        visible: false,
                                        animate: false,
                                        drawBehind: true,
                                        title: {
                                            text: 'Scenos'
                                        },
                                        largeTitle: {
                                            visible: true
                                        },
                                        backButton: {
                                            visible: true
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    options: {
                        bottomTabs: {
                            visible: true,
                            currentTabIndex: 0,
                            titleDisplayMode: 'alwaysShow'
                        }
                    }
                }
            }
        });
    });
}
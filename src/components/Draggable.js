import React, { Component } from 'react';
import { TouchableOpacity, View, Image, StyleSheet, InteractionManager, I18nManager, Animated, Text, Dimensions, SafeAreaView } from 'react-native';
import { createPanResponder, rotatePoint } from '../plugins/utils';
import { PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import images from '../plugins/images';
let circleSize = { x: 30, y: 30 };
export class Draggable extends Component {
    constructor(props) {
        super(props);
        this.width = Dimensions.get('window').width;
        this.height = Dimensions.get('window').height;
        console.log(this.height, this.width);
        this._translateX = new Animated.Value(0);
        this._translateY = new Animated.Value(0);
        this._lastOffset = { x: 0, y: 0 };
        this.center = { x: 0, y: 0 };
        this.coords = { x: 0, y: 0 };
        this.r = 0;
        this.test = { x: 0, y: 0 };
        this._onGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this._translateX,
                        translationY: this._translateY
                    }
                }
            ],
            { useNativeDriver: true }
        );
    }

    componentDidMount() {
    }

    onGestureEvent2 = event => {
        this._translateX.setValue(event.nativeEvent.translationX);
        this._translateY.setValue(event.nativeEvent.translationY);
        let ev = event.nativeEvent,
            y2 = this.center.y + ev.absoluteY - this.r,
            x2 = this.center.x + ev.absoluteX - this.r,
            angle = Math.atan2(y2 - this.center.y, x2 - this.center.x);
        let g = angle;
        let x = Math.abs((this.center.x + Math.cos(g) * this.r) - ev.absoluteX),
            y = Math.abs((this.center.y + Math.sin(g) * this.r) - ev.absoluteY);
        console.log(x, y, "XY");
        //console.log(x2, y2, 'xy2');
        if (angle < 0) angle += 2 * Math.PI;
        angle = Math.abs(360 - angle * (180 / Math.PI));
        //console.log(angle, 'ANGLE');
        //console.log(event.nativeEvent, "native event");
        //console.log(this._lastOffset, 'offset');
        let offsetX = x, offsetY = y;
        if (ev.absoluteX <= this.center.x && ev.absoluteY <= this.center.y) {
            console.log('pirmas ketvirtis');
            offsetX = x * -1;
            offsetY = y * -1;
        }
        else if (ev.absoluteX < this.center.x && ev.absoluteY > this.center.y) {
            console.log('antras ketvirtis');
            offsetX = x * -1;
            offsetY = y * 1;
        }
        else if (ev.absoluteX > this.center.x && ev.absoluteY < this.center.y) {
            console.log('trecias ketvirtis');
            offsetX = x * 1;
            offsetY = y * -1;
        }
        else if (ev.absoluteX > this.center.x && ev.absoluteY > this.center.y) {
            console.log('ketvirtas ketvirtis');
            offsetX = x * 1;
            offsetY = y * 1;
        }
        console.log(offsetX, offsetY, 'offsetXY');

        console.log(this._translateX, 'trans x');
        // this._translateX.setValue(0);   
        // this._translateY.setValue(0);  
        //this._lastOffset.x += this._lastOffset.x - offsetX;
        //this._lastOffset.y += this._lastOffset.y - offsetY;
        this._translateX.setOffset(offsetX);
        this._translateX.setValue(this._translateX._value + this._lastOffset.x); //this.center.x + this.r - ev.absoluteX
        this._translateY.setOffset(offsetY);
        this._translateY.setValue(this._translateY._value + this._lastOffset.y); //this.center.y + this.r - ev.absoluteY
        // Animated.event(
        //     [
        //         {
        //             nativeEvent: {
        //                 translationX: this._translateX,
        //                 translationY: this._translateY
        //             }
        //         }
        //     ],
        //     { useNativeDriver: true }
        // );
    }

    _onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            let ev = event.nativeEvent,
                y2 = this.center.y + ev.absoluteY - this.r,
                x2 = this.center.x + ev.absoluteX - this.r,
                angle = Math.atan2(y2 - this.center.y, x2 - this.center.x);
            let g = angle;
            let x = Math.abs((this.center.x + Math.cos(g) * this.r) - ev.absoluteX),
                y = Math.abs((this.center.y + Math.sin(g) * this.r) - ev.absoluteY);
            if (angle < 0) angle += 2 * Math.PI;
            angle = Math.abs(360 - angle * (180 / Math.PI));
            console.log(angle, 'ANGLE');
            let offsetX = x, offsetY = y;
            if (ev.absoluteX <= this.center.x && ev.absoluteY <= this.center.y) {
                console.log('pirmas ketvirtis');
                offsetX = x * -1;
                offsetY = y * -1;
            }
            else if (ev.absoluteX < this.center.x && ev.absoluteY > this.center.y) {
                console.log('antras ketvirtis');
                offsetX = x * -1;
                offsetY = y * 1;
            }
            else if (ev.absoluteX > this.center.x && ev.absoluteY < this.center.y) {
                console.log('trecias ketvirtis');
                offsetX = x * 1;
                offsetY = y * -1;
            }
            else if (ev.absoluteX > this.center.x && ev.absoluteY > this.center.y) {
                console.log('ketvirtas ketvirtis');
                offsetX = x * 1;
                offsetY = y * 1;
            }
            //this._lastOffset.x += offsetX;// + offsetX;
            //this._lastOffset.y += offsetY;//+ offsetY;
            this._translateX.setOffset(this._lastOffset.x);
            this._translateX.setValue(offsetX); //this.center.x + this.r - ev.absoluteX
            this._translateY.setOffset(this._lastOffset.y);
            this._translateY.setValue(offsetY); //this.center.y + this.r - ev.absoluteY
        }
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red', margin: 0, padding: 0 }}>
                <Image
                    source={images['colorCircle']}
                    ref={(ref) => { this.imgRef = ref }}
                    resizeMode={'contain'}
                    onLayout={(event, layout) => {
                        let yc = (-this.height / 2) + ((event.nativeEvent.layout.height + event.nativeEvent.layout.y) / 2) - circleSize.y / 2;
                        let xc = event.nativeEvent.layout.width / 2 - circleSize.x / 2;
                        let coordY = (event.nativeEvent.layout.height + event.nativeEvent.layout.y) / 2 - circleSize.y / 2;
                        let coordX = event.nativeEvent.layout.width - circleSize.x / 2;
                        console.log(`yc: ${yc} xc: ${xc}`);
                        console.log(`coordY: ${coordY} coordX: ${coordX}`);
                        this._translateX.setOffset(xc);
                        this._translateX.setValue(0);
                        this._lastOffset.x = xc;
                        this._translateY.setOffset(yc);
                        this._translateY.setValue(0);
                        this._lastOffset.y = yc;
                        this.center.x = xc;
                        this.center.y = Math.abs(yc); //- 30 | jeigu reik atimti mazo apsikritim
                        this.coords.x = coordX;
                        this.coords.y = coordY;
                        this.r = event.nativeEvent.layout.width / 2;
                        console.log(event.nativeEvent, "event");
                        console.log(this.coords, 'coords');
                        console.log(this.center, 'center')
                    }
                    }
                    style={{ width: '100%', backgroundColor: 'green' }}>
                </Image >
                <PanGestureHandler
                    {...this.props}
                    onGestureEvent={this.onGestureEvent2}
                    onHandlerStateChange={this._onHandlerStateChange}>
                    <Animated.View
                        style={[
                            styles.box,
                            {
                                transform: [
                                    { translateX: this._translateX },
                                    { translateY: this._translateY }
                                ]
                            },
                            this.props.boxStyle,
                        ]}
                    >
                    </Animated.View>
                </PanGestureHandler>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    box: {
        width: circleSize.x,
        height: circleSize.y,
        alignSelf: 'center',
        backgroundColor: 'plum',
        margin: 0,
        borderRadius: circleSize.x * 2,
        zIndex: 200,
    }
});

export default Draggable;
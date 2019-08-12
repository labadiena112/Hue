import { PanResponder } from 'react-native';

export function createPanResponder({ onStart = fn, onMove = fn, onEnd = fn }) {
    return PanResponder.create({
        onStartShouldSetPanResponder: fn,
        onStartShouldSetPanResponderCapture: fn,
        onMoveShouldSetPanResponder: fn,
        onMoveShouldSetPanResponderCapture: fn,
        onPanResponderTerminationRequest: fn,
        onPanResponderGrant: (evt, state) => {
            return onStart({ x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY }, evt, state)
        },
        onPanResponderMove: (evt, state) => {
            return onMove({ x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY }, evt, state)
        },
        onPanResponderRelease: (evt, state) => {
            return onEnd({ x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY }, evt, state)
        },
    })
}

export function rotatePoint(point, angle, center = { x: 0, y: 0 }) {
    // translation to origin
    const transOriginX = point.x - center.x
    const transOriginY = point.y - center.y

    // rotation around origin
    const rotatedX = transOriginX * Math.cos(angle) - transOriginY * Math.sin(angle)
    const rotatedY = transOriginY * Math.cos(angle) + transOriginX * Math.sin(angle)

    // translate back from origin
    const normalizedX = rotatedX + center.x
    const normalizedY = rotatedY + center.y
    return {
        x: normalizedX,
        y: normalizedY,
    }
}
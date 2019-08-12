import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignSelf: 'stretch',
    },
    row: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        flexDirection: 'row',  // main axis
        justifyContent: 'flex-start', // main axis
        alignItems: 'center', // cross axis
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 40
    },
    row_cell_switch: {
        flex: 0.2,
        flexDirection: 'column',
    },
    row_cell_place: {
        flex: 1,
    },
    row_name: {
        fontSize: 18,
        flex: 0,
    },
    row_slider: {
        flex: 0,
    }
});
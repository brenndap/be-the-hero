import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
    },

    headerButton: {
        fontWeight: "bold"
    },

    incident: {
        marginTop: 40,
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 10
    },

    incidentTitle: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    incidentProperty: {
        fontSize: 14,
        color: "#41414d",
        fontWeight: "bold"
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: "#737380"
    },

    contact: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#fff",
    },

    contactTitle: {
        fontSize: 18,
        color: "#13131a",
        fontWeight: "bold"
    },

    contactText: {
        fontSize: 15,
        lineHeight: 24,
        color: "#737380",
        marginTop: 5,
        marginBottom: 8,
    },

    contactActions: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    contactButton: {
        backgroundColor: "#E02041",
        width: "48%",
        height: 50,
        paddingVertical: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15
    }
})
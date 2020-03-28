import React from 'react'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import logo from '../../assets/logo.png'
import * as MailCompose from 'expo-mail-composer'

import styles from './style'

export default function Detail() {

    const navigation = useNavigation()
    const route = useRoute() 

    const incident = route.params.incident

    const contactMessage = `Olá, ${incident.name}, estou entrando em contato para ajudar no caso ${incident.title}.`

    const navigateToHome = () => {
        navigation.goBack()
    }

    const sendEmail = () => {
        MailCompose.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: contactMessage
        })
    }

    const sendWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${contactMessage}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <TouchableOpacity onPress={navigateToHome} >
                    <Feather name="arrow-left" size={30} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <View style={styles.incidentTitle}>
                    <View>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                    </View>

                    <View>
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
                    </View>

                </View>

                <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>


            </View>

            <View style={styles.contact}>
                <Text style={styles.contactTitle}>Salve o dia!</Text>
                <Text style={styles.contactTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.contactText}>Entre em contato:</Text>
                <View style={styles.contactActions}>
                    <TouchableOpacity style={styles.contactButton} onPress={sendWhatsapp}>
                        <Text style={styles.buttonText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton} onPress={sendEmail}>
                        <Text style={styles.buttonText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
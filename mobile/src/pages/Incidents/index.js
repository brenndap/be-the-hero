import React, { useState, useEffect } from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import logo from '../../assets/logo.png'
import api from '../../services/api'

import styles from './style'

export default function Incidents() {

    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigateToDetail = incident => {
        navigation.navigate('Detail', { incident })
    }

    const loadIncidents = async () => {

        if (loading)
            return

        if (total > 0 && incidents.length === total)
            return

        setLoading(true)
        const response = await api.get('incidents', {
            params: { page  }
        })
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Image source={logo} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{`${total} casos`}</Text>.
                </Text>

            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia!
            </Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <View style={styles.incidentTitle}>
                            <View>
                                <Text style={styles.incidentProperty}>ONG:</Text>
                                <Text style={styles.incidentValue}>{incident.name}</Text>
                            </View>

                            <View>
                                <Text style={styles.incidentProperty}>CASO:</Text>
                                <Text style={styles.incidentValue}>{incident.title}</Text>
                            </View>

                        </View>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />

                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}
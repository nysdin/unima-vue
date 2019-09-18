import Vue from 'vue'
import ActionCable from 'actioncable'

const cable = {
    state: {
        cable: null,
        notificationChannel: null,
        notifications: [],
    },
    mutations: {
        connect(state, auth){
            const { token, uid, client } = auth
            const url = process.env.VUE_APP_WS_ENDPOINT + `/?access-token=${token}&uid=${uid}&client=${client}`
            const cable = ActionCable.createConsumer(url)
            state.cable = cable
            state.notificationChannel = cable.subscriptions.create('NotificationChannel', {
                connected(){
                    console.log('connected')
                },
                disconnected(){
                    console.log('disconnected')
                },
                received(data){
                    console.log(data)
                    state.notifications.push(data)
                }
            })
        },
        disconnect(state){
            state.cable.subscriptions.consumer.disconnect()
            state.notificationChannel = null
            state.cable = null
            state.notifications = []
        },
        setNotifications(state, data){
            state.notifications = data
        },
        sendNotification(state, data){
            const { recipientId, productId, action } = data
            state.notificationChannel.perform('notice', {
                recipient_id: recipientId,
                product_id: productId,
                action_type: action,
            })
        }
    }
}

export default cable
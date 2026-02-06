import { useEffect, useState } from 'react'
import { useStore } from '../../../store/StoreContext'
import { hasRequiredRole, Roles } from '../../../store/UserStore'
import { useNavigate } from 'react-router-dom'
import { handlerUncaughtError, isErrorResponse } from '../../../http/errors/ErrorHandler'
import { getStats } from '../../../http/orderApi'
import { toast } from 'react-toastify'
import type { OrderStats } from '../../../types/order.types'
import { Card, Spinner } from 'react-bootstrap'
import DailyStatsChart from '../Stats/DailyStatsChart'

const StatsTab = () => {

    const {user} = useStore()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const [stats, setStats] = useState<OrderStats | null>(null)

    const loadStats = async () => {
        try {
            const stats = await getStats()

            if (isErrorResponse(stats)) {
                return stats.errors.forEach(error => toast.error(error.msg))
            }

            setStats(stats)
        } catch (error) {
            handlerUncaughtError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!user.isAuth || !user.user?.role || !hasRequiredRole(Roles.Admin, user.user.role)) {
            navigate("/")
        } else {
            loadStats()
        }
    }, [])

    return (
        <>
            {
                loading ? <Spinner animation='grow' /> :
                
                <div className='flex flex-col space-y-10'>
                    <h1>Order stats</h1>
                    <Card>
                        <Card.Header>
                            <Card.Title>Summary</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>Total orders: {stats?.orderSummary.totalOrders}</Card.Text>
                            <Card.Text>Total sum: {stats?.orderSummary.totalSum}</Card.Text>
                            <Card.Text>Average order total: {stats?.orderSummary.totalAvg.toFixed(2)}</Card.Text>
                        </Card.Body>
                    </Card>

                    {
                        stats?.dailyStats ?
                            <DailyStatsChart dailyStats={stats.dailyStats} /> :
                            <></>
                    }
                </div>
            }
        </>
    )
}

export default StatsTab
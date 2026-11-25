import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  FileText,
  Package,
  Sparkles,
  Info,
  ChevronRight,
} from 'lucide-react'
import { useNotification } from '@/context/NotificationContext'

export const Notifications: React.FC = () => {
  const navigate = useNavigate()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification()

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markAsRead(notif.id)
    if (notif.targetPath) {
      navigate(notif.targetPath)
    }
  }

  const getNotificationIcon = (type: typeof notifications[0]['type']) => {
    switch (type) {
      case 'artwork':
        return <Sparkles className="w-4 h-4 text-white" />
      case 'quote':
        return <FileText className="w-4 h-4 text-blue-400" />
      case 'order':
        return <Package className="w-4 h-4 text-emerald-400" />
      default:
        return <Info className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar pb-28">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#162758] via-[#1d3c8c] to-[#183274] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-950/60 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <span className="font-cinzel text-xs font-bold text-white tracking-wider">
          Notification Center {unreadCount > 0 && `(${unreadCount})`}
        </span>

        {unreadCount > 0 ? (
          <button
            onClick={markAllAsRead}
            className="text-[11px] font-bold text-blue-200 hover:text-white hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>

      <div className="px-4 py-4 space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all flex items-start gap-3 group active:scale-[0.99] relative ${
                notif.isRead
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-100'
              }`}
            >
              {/* Unread Blue/Gold Indicator Dot */}
              {!notif.isRead && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-600 shadow-xs" />
              )}

              {/* Icon Container */}
              <div className="w-9 h-9 rounded-xl bg-[#0a1128] flex items-center justify-center shrink-0 border border-slate-200">
                {getNotificationIcon(notif.type)}
              </div>

              {/* Notification Content */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="font-cinzel text-xs font-bold text-slate-900 group-hover:text-[#0a1128] truncate">
                    {notif.title}
                  </h4>
                  {notif.badgeLabel && (
                    <span className="bg-slate-100 text-slate-700 text-[8px] font-bold px-1.5 py-0.2 rounded shrink-0">
                      {notif.badgeLabel}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {notif.message}
                </p>

                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px]">
                  <span className="text-slate-400">{notif.timestamp}</span>
                  {notif.targetPath && (
                    <span className="font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>View details</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-xs my-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Bell className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-base font-bold text-slate-900">
              All Caught Up
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You don't have any unread notifications right now. Quote updates and proof alerts will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

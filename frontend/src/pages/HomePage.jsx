import React, { useState } from 'react';
import { MessageCircle, Settings, Bell, LogOut, Search } from 'lucide-react';

const contacts = [
  { id: 1, name: 'James Anderson', status: 'Online', avatar: '👨‍💼', hasNotification: false },
  { id: 2, name: 'William Clark', status: 'Online', avatar: '👨‍🦳', hasNotification: true },
  { id: 3, name: 'Benjamin Taylor', status: 'Online', avatar: '👨‍🦰', hasNotification: false },
  { id: 4, name: 'Lucas Moore', status: 'Online', avatar: '👨‍🎓', hasNotification: false },
  { id: 5, name: 'Henry Jackson', status: 'Online', avatar: '👨‍🔬', hasNotification: false },
  { id: 6, name: 'Alexander Martin', status: 'Online', avatar: '👨‍💻', hasNotification: false },
  { id: 7, name: 'Daniel Rodriguez', status: 'Online', avatar: '👨‍🎨', hasNotification: false },
  { id: 8, name: 'John', status: 'Online', avatar: '👨', hasNotification: false },
  { id: 9, name: 'Jagdish', status: 'Online', avatar: '👨‍🏫', hasNotification: true },
  { id: 10, name: 'Jagdish', status: 'Offline', avatar: '👨‍🏫', hasNotification: false },
  { id: 11, name: 'Anurag', status: 'Offline', avatar: '👨‍💼', hasNotification: false },
  { id: 12, name: 'Captain B', status: 'Offline', avatar: '👨‍✈️', hasNotification: false },
];

function HomePage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onlineContacts = filteredContacts.filter(contact => contact.status === 'Online');
  const offlineContacts = filteredContacts.filter(contact => contact.status === 'Offline');

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-amber-500" />
              <h1 className="text-xl font-semibold text-amber-500">Chat App</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <LogOut className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Contacts</h2>
              <span className="text-sm text-gray-400">Show online only</span>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Online Contacts */}
            {onlineContacts.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Online ({onlineContacts.length})</h3>
                <div className="space-y-2">
                  {onlineContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedContact?.id === contact.id
                          ? 'bg-amber-500 bg-opacity-20 border-l-4 border-amber-500'
                          : 'hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg">
                          {contact.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{contact.name}</h4>
                          {contact.hasNotification && (
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-green-400">{contact.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offline Contacts */}
            {offlineContacts.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Offline ({offlineContacts.length})</h3>
                <div className="space-y-2">
                  {offlineContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedContact?.id === contact.id
                          ? 'bg-amber-500 bg-opacity-20 border-l-4 border-amber-500'
                          : 'hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg opacity-70">
                          {contact.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-500 rounded-full border-2 border-gray-800"></div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium opacity-70">{contact.name}</h4>
                          {contact.hasNotification && (
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{contact.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-semibold text-amber-500 mb-2">Welcome to Chatty!</h2>
          <p className="text-gray-400">Select a conversation from the sidebar to start chatting</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
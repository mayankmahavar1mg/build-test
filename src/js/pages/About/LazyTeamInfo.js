import React from "react"

function LazyTeamInfo() {
    const team = [
        {
            name: "Development Team",
            role: "Core Framework",
            description: "Building the foundation of Catalyst with modern React patterns and best practices.",
            members: ["React Engineers", "Performance Experts", "Architecture Specialists"]
        },
        {
            name: "Design Team",
            role: "User Experience",
            description: "Creating intuitive developer experience and beautiful default themes.",
            members: ["UX Designers", "UI Engineers", "Design System Architects"]
        },
        {
            name: "Documentation Team",
            role: "Knowledge Base",
            description: "Comprehensive documentation and examples to help developers succeed.",
            members: ["Technical Writers", "Developer Advocates", "Community Managers"]
        }
    ]

    return (
        <div>
            <h3>Our Team</h3>
            <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '30px',
                fontSize: '16px',
                lineHeight: '1.6'
            }}>
                Catalyst is built by a passionate team dedicated to making React development faster, 
                more efficient, and more enjoyable.
            </p>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
            }}>
                {team.map((teamMember, index) => (
                    <div key={index} style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '24px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <h4 style={{
                            margin: '0 0 8px 0',
                            color: '#61dafb',
                            fontSize: '20px',
                            fontWeight: '600'
                        }}>
                            {teamMember.name}
                        </h4>
                        <div style={{
                            color: '#28a745',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '12px'
                        }}>
                            {teamMember.role}
                        </div>
                        <p style={{
                            margin: '0 0 16px 0',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '14px',
                            lineHeight: '1.5'
                        }}>
                            {teamMember.description}
                        </p>
                        <div>
                            <strong style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '14px'
                            }}>
                                Team Members:
                            </strong>
                            <ul style={{
                                margin: '8px 0 0 0',
                                paddingLeft: '20px',
                                listStyle: 'none'
                            }}>
                                {teamMember.members.map((member, memberIndex) => (
                                    <li key={memberIndex} style={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '13px',
                                        marginBottom: '4px',
                                        position: 'relative',
                                        paddingLeft: '15px'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '0',
                                            color: '#61dafb'
                                        }}>•</span>
                                        {member}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LazyTeamInfo 
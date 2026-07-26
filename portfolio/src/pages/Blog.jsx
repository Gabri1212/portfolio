import React from 'react'
import { Container } from 'react-bootstrap'
import PaperCard from '../components/PaperCard'

export default function Blog() {
  return (
    <section className="py-5 blog-section page-section d-flex align-items-center">
      <Container className="h-100 d-flex align-items-center">
        <div className="d-flex flex-column gap-4 w-100">
          <PaperCard
            title="WiFi performance report"
            date="12/04/2026"
            abstract="This report details a comparative performance analysis of WiFi networks under controlled stress conditions. The evaluation methodology isolates two primary transport protocols, TCP and UDP, sequentially, while systematically varying the Maximum Segment Size (MSS) and Maximum Transmission Unit (MTU) parameters for each. Testing encompasses three distinct link topologies: wireless-to-wireless (WiFi–WiFi), wired-to-wireless (Ethernet-WiFi), and wired-to-wired (Ethernet–Ethernet) baselines. Data collection was performed across a heterogeneous testbed comprising multiple WiFi network interface controllers, diverse operating system environments. The following sections present the quantitative results regarding throughput, goodput, and packet loss derived from these stress tests, focusing strictly on the observed correlations between configuration variables and network performance metrics."
            preview="/WiFi_Performance-cover.svg"
            path="/WiFi_Performance.pdf"
          />
          <PaperCard
            title="Android GNSS spoofing"
            date="15/02/2026"
            abstract="This project focuses on the analysis of Android GNSS raw measurements and the emulation of a GNSS spoofing attack in a controlled software environment. The experimental workflow was divided into two main phases: data collection and offline analysis. GNSS measurements were recorded on an Android smartphone using the GNSS Logger application, with measurement log-on enabled. During acquisition, the app recorded raw GNSS data that were later exported to a PC for post-processing. Timed logging was used to keep acquisitions comparable in duration."
            preview="/GNSS_spoofing-cover.svg"
            path="/GNSS_spoofing.pdf"
          />
        </div>
      </Container>
    </section>
  )
}


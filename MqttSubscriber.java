@Service
public class MqttSubscriber {
    @Autowired
    private EnergyService energyService;

    @MqttListener(topics = "smart_home/energy", qos = 1)
    public void handleEnergyData(String payload) {
        EnergyData data = new Gson().fromJson(payload, EnergyData.class);
        energyService.saveEnergyData(data);
    }
}

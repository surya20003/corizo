@RestController
@RequestMapping("/api/energy")
public class EnergyController {
    @Autowired
    private EnergyService energyService;

    @GetMapping
    public List<EnergyData> getEnergyData() {
        return energyService.getEnergyData();
    }
}
